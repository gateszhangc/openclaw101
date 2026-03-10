from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageColor, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
FONT_ROOT = Path("/Users/a1-6/.codex/skills/canvas-design/canvas-fonts")
OUTPUTS = {
    "route-badge": ROOT / "openclaw101-logo-preview-a-route-badge.png",
    "face-structure": ROOT / "openclaw101-logo-preview-b-face-structure.png",
    "letter-fusion": ROOT / "openclaw101-logo-preview-c-letter-fusion.png",
    "seal-totem": ROOT / "openclaw101-logo-preview-d-seal-totem.png",
}
CONTACT_SHEET = ROOT / "openclaw101-logo-preview-contact-sheet.png"

WIDTH = 1800
HEIGHT = 1350

PALETTE = {
    "ink": "#17120E",
    "charcoal": "#0B0E12",
    "charcoal_soft": "#12161C",
    "charcoal_lift": "#1A2129",
    "paper": "#F4E9DB",
    "paper_soft": "#E7D7C5",
    "mist": "#A6937F",
    "mist_dark": "#725F4E",
    "ember": "#EF6B43",
    "ember_bright": "#FF9766",
    "ember_deep": "#D75531",
    "cream": "#FFF8F0",
}

FONT_FILES = {
    "display": FONT_ROOT / "BricolageGrotesque-Bold.ttf",
    "display_regular": FONT_ROOT / "BricolageGrotesque-Regular.ttf",
    "serif": FONT_ROOT / "YoungSerif-Regular.ttf",
    "mono": FONT_ROOT / "JetBrainsMono-Regular.ttf",
    "mono_bold": FONT_ROOT / "JetBrainsMono-Bold.ttf",
}


def rgba(value: str, alpha: int = 255) -> tuple[int, int, int, int]:
    rgb = ImageColor.getrgb(value)
    return rgb[0], rgb[1], rgb[2], alpha


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_FILES[name]), size=size)


def mix(a: str, b: str, t: float) -> tuple[int, int, int, int]:
    ra, ga, ba = ImageColor.getrgb(a)
    rb, gb, bb = ImageColor.getrgb(b)
    return (
        int(ra + (rb - ra) * t),
        int(ga + (gb - ga) * t),
        int(ba + (bb - ba) * t),
        255,
    )


def draw_vertical_gradient(image: Image.Image, top: str, bottom: str) -> None:
    draw = ImageDraw.Draw(image)
    for y in range(image.height):
        t = y / max(1, image.height - 1)
        draw.line([(0, y), (image.width, y)], fill=mix(top, bottom, t))


def add_radial_glow(
    image: Image.Image,
    center: tuple[float, float],
    radius: float,
    color: str,
    alpha: int,
) -> None:
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    cx, cy = center
    for step in range(8, 0, -1):
        r = radius * step / 8
        step_alpha = int(alpha * (step / 8) ** 2 * 0.14)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=rgba(color, step_alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=54))
    image.alpha_composite(glow)


def add_grain(image: Image.Image, seed: int) -> None:
    rng = random.Random(seed)
    grain = Image.new("RGBA", image.size, (0, 0, 0, 0))
    pixels = grain.load()
    for y in range(0, image.height, 2):
        for x in range(0, image.width, 2):
            v = rng.randint(8, 28)
            pixels[x, y] = (255, 255, 255, v)
    grain = grain.filter(ImageFilter.GaussianBlur(0.5))
    image.alpha_composite(grain)


def paste_shadow(
    image: Image.Image,
    box: tuple[int, int, int, int],
    radius: int,
    alpha: int = 135,
) -> None:
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    x0, y0, x1, y1 = box
    draw.rounded_rectangle(
        (x0, y0 + 12, x1, y1 + 12),
        radius=radius,
        fill=(0, 0, 0, alpha),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(36))
    image.alpha_composite(shadow)


def draw_card(
    image: Image.Image,
    box: tuple[int, int, int, int],
    radius: int,
    fill: str,
    outline: str,
    outline_alpha: int = 255,
) -> None:
    paste_shadow(image, box, radius)
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.rounded_rectangle(box, radius=radius, fill=rgba(fill), outline=rgba(outline, outline_alpha), width=2)
    image.alpha_composite(layer)


def draw_spaced_text(
    draw: ImageDraw.ImageDraw,
    position: tuple[float, float],
    text: str,
    font_obj: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: int,
) -> None:
    x, y = position
    for char in text:
        draw.text((x, y), char, font=font_obj, fill=fill)
        bbox = draw.textbbox((x, y), char, font=font_obj)
        x += bbox[2] - bbox[0] + tracking


def draw_background(image: Image.Image, seed: int) -> None:
    draw_vertical_gradient(image, PALETTE["charcoal"], PALETTE["charcoal_lift"])
    add_radial_glow(image, (WIDTH * 0.22, HEIGHT * 0.18), 420, PALETTE["ember"], 240)
    add_radial_glow(image, (WIDTH * 0.84, HEIGHT * 0.82), 360, PALETTE["paper"], 120)
    draw = ImageDraw.Draw(image)
    for x in range(120, WIDTH, 90):
        draw.line((x, 0, x, HEIGHT), fill=rgba("#FFFFFF", 14), width=1)
    for y in range(96, HEIGHT, 90):
        draw.line((0, y, WIDTH, y), fill=rgba("#FFFFFF", 12), width=1)
    for index in range(8):
        offset = index * 92
        y = 210 + offset
        draw.arc(
            (-140, y - 180, WIDTH + 180, y + 180),
            start=196,
            end=344,
            fill=rgba(PALETTE["paper"], 22 if index % 2 == 0 else 14),
            width=2,
        )
    add_grain(image, seed)


def draw_label_block(
    draw: ImageDraw.ImageDraw,
    title: str,
    title_suffix: str,
    note: str,
) -> None:
    mono = font("mono", 22)
    mono_bold = font("mono_bold", 22)
    serif = font("serif", 74)
    sans = font("display_regular", 28)

    draw_spaced_text(
        draw,
        (112, 72),
        "OPENCLAW101 / LOGO STUDY",
        mono,
        rgba(PALETTE["paper"], 180),
        5,
    )
    draw.text((112, 122), title, font=serif, fill=rgba(PALETTE["paper"]))
    draw.text((112, 220), title_suffix, font=mono_bold, fill=rgba(PALETTE["ember_bright"]))

    note_box = (112, 266, 760, 426)
    draw.rounded_rectangle(
        note_box,
        radius=28,
        fill=rgba(PALETTE["paper"], 238),
        outline=rgba(PALETTE["paper"], 70),
        width=1,
    )
    draw.multiline_text(
        (142, 300),
        note,
        font=sans,
        fill=rgba(PALETTE["mist_dark"], 242),
        spacing=10,
    )


def draw_wordmark(
    draw: ImageDraw.ImageDraw,
    anchor: tuple[int, int],
    dark: bool,
    scale: float = 1.0,
    compact: bool = False,
) -> None:
    x, y = anchor
    display = font("display", int(96 * scale))
    mono = font("mono_bold", int(42 * scale))
    micro = font("mono", int(22 * scale))
    body = font("display_regular", int(28 * scale))

    main_fill = rgba(PALETTE["cream"] if dark else PALETTE["ink"])
    accent_fill = rgba(PALETTE["ember"] if not dark else PALETTE["ember_bright"])
    muted_fill = rgba(PALETTE["paper"] if dark else PALETTE["mist_dark"], 190)

    draw.text((x, y), "OpenClaw", font=display, fill=main_fill)
    bbox = draw.textbbox((x, y), "OpenClaw", font=display)
    if not compact:
        draw.text((bbox[2] + 18, y + int(28 * scale)), "101", font=mono, fill=accent_fill)
    draw_spaced_text(
        draw,
        (x, bbox[3] + int(18 * scale)),
        "STARTER ROUTE",
        micro,
        muted_fill,
        int(4 * scale),
    )
    if not compact:
        draw.text(
            (x, bbox[3] + int(58 * scale)),
            "friendly claw geometry for a newcomer-first guide",
            font=body,
            fill=muted_fill,
        )


def draw_route_badge(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], dark: bool) -> None:
    x0, y0, x1, y1 = box
    cx = (x0 + x1) / 2
    w = x1 - x0
    h = y1 - y0
    stroke = max(10, int(w * 0.042))
    accent = rgba(PALETTE["ember_bright"] if dark else PALETTE["ember"])
    support = rgba(PALETTE["cream"] if dark else PALETTE["ink"])
    muted = rgba(PALETTE["paper"], 58) if dark else rgba(PALETTE["mist_dark"], 50)

    pad_outer = int(w * 0.07)
    pad_inner = int(w * 0.16)
    draw.rounded_rectangle((x0 + pad_outer, y0 + pad_outer, x1 - pad_outer, y1 - pad_outer), radius=int(w * 0.18), outline=muted, width=max(2, int(w * 0.007)))
    draw.rounded_rectangle((x0 + pad_inner, y0 + pad_inner, x1 - pad_inner, y1 - pad_inner), radius=int(w * 0.14), outline=muted, width=2)
    claw_y = y0 + h * 0.23
    claw_w = w * 0.26
    draw.arc((x0 + w * 0.10, claw_y - h * 0.10, x0 + w * 0.10 + claw_w, claw_y + h * 0.13), start=206, end=30, fill=accent, width=stroke)
    draw.arc((x1 - w * 0.10 - claw_w, claw_y - h * 0.10, x1 - w * 0.10, claw_y + h * 0.13), start=150, end=334, fill=accent, width=stroke)
    draw.line((cx, y0 + h * 0.25, cx, y1 - h * 0.29), fill=support, width=max(6, int(stroke * 0.72)))
    for offset_factor, radius_factor in ((0.00, 0.030), (0.14, 0.042), (0.28, 0.030)):
        r = max(8, int(w * radius_factor))
        cy_node = y0 + h * 0.37 + h * offset_factor
        draw.ellipse((cx - r, cy_node - r, cx + r, cy_node + r), fill=accent, outline=support, width=8)
    draw.arc((cx - w * 0.26, y1 - h * 0.44, cx + w * 0.26, y1 - h * 0.02), start=202, end=338, fill=support, width=stroke)
    draw.line((cx - w * 0.32, y1 - h * 0.16, cx - w * 0.39, y1 - h * 0.08), fill=support, width=max(5, int(stroke * 0.7)))
    draw.line((cx + w * 0.32, y1 - h * 0.16, cx + w * 0.39, y1 - h * 0.08), fill=support, width=max(5, int(stroke * 0.7)))


def draw_face_structure(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], dark: bool) -> None:
    x0, y0, x1, y1 = box
    cx = (x0 + x1) / 2
    w = x1 - x0
    h = y1 - y0
    stroke = max(10, int(w * 0.046))
    accent = rgba(PALETTE["ember_bright"] if dark else PALETTE["ember"])
    support = rgba(PALETTE["cream"] if dark else PALETTE["ink"])
    support_soft = rgba(PALETTE["paper"], 54) if dark else rgba(PALETTE["mist_dark"], 48)

    draw.arc((x0 + w * 0.14, y0 + h * 0.08, x1 - w * 0.14, y1 - h * 0.14), start=198, end=342, fill=support_soft, width=max(2, int(w * 0.007)))
    draw.arc((x0 + w * 0.20, y0 + h * 0.13, x1 - w * 0.20, y1 - h * 0.18), start=202, end=338, fill=support_soft, width=2)
    draw.ellipse((cx - w * 0.27, y0 + h * 0.25, cx - w * 0.09, y0 + h * 0.44), fill=accent)
    draw.ellipse((cx + w * 0.09, y0 + h * 0.25, cx + w * 0.27, y0 + h * 0.44), fill=accent)
    draw.ellipse((cx - w * 0.20, y0 + h * 0.29, cx - w * 0.13, y0 + h * 0.36), fill=rgba(PALETTE["paper"] if dark else PALETTE["cream"]))
    draw.ellipse((cx + w * 0.13, y0 + h * 0.29, cx + w * 0.20, y0 + h * 0.36), fill=rgba(PALETTE["paper"] if dark else PALETTE["cream"]))
    draw.arc((x0 + w * 0.23, y0 + h * 0.15, x0 + w * 0.48, y0 + h * 0.39), start=206, end=20, fill=accent, width=max(7, int(stroke * 0.82)))
    draw.arc((x1 - w * 0.48, y0 + h * 0.15, x1 - w * 0.23, y0 + h * 0.39), start=160, end=334, fill=accent, width=max(7, int(stroke * 0.82)))
    draw.arc((cx - w * 0.30, y0 + h * 0.43, cx + w * 0.30, y1 - h * 0.16), start=204, end=336, fill=support, width=stroke)
    draw.line((cx - w * 0.14, y1 - h * 0.29, cx, y1 - h * 0.17), fill=support, width=max(5, int(stroke * 0.74)))
    draw.line((cx + w * 0.14, y1 - h * 0.29, cx, y1 - h * 0.17), fill=support, width=max(5, int(stroke * 0.74)))
    draw.ellipse((cx - w * 0.022, y0 + h * 0.47, cx + w * 0.022, y0 + h * 0.515), fill=accent)


def draw_letter_fusion(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], dark: bool) -> None:
    x0, y0, x1, y1 = box
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2
    w = x1 - x0
    h = y1 - y0
    stroke = max(10, int(w * 0.055))
    accent = rgba(PALETTE["ember_bright"] if dark else PALETTE["ember"])
    support = rgba(PALETTE["cream"] if dark else PALETTE["ink"])
    muted = rgba(PALETTE["paper"], 52) if dark else rgba(PALETTE["mist_dark"], 44)

    draw.arc((x0 + w * 0.12, y0 + h * 0.10, x1 - w * 0.12, y1 - h * 0.10), start=42, end=336, fill=support, width=stroke)
    draw.arc((x0 + w * 0.18, y0 + h * 0.16, x1 - w * 0.18, y1 - h * 0.16), start=52, end=326, fill=muted, width=3)
    draw.arc((x0 + w * 0.21, y0 + h * 0.12, x0 + w * 0.45, y0 + h * 0.38), start=208, end=24, fill=accent, width=max(7, int(stroke * 0.76)))
    draw.arc((x1 - w * 0.45, y0 + h * 0.12, x1 - w * 0.21, y0 + h * 0.38), start=156, end=332, fill=accent, width=max(7, int(stroke * 0.76)))
    draw.arc((cx - w * 0.21, cy - h * 0.01, cx + w * 0.21, cy + h * 0.31), start=204, end=338, fill=support, width=max(8, int(stroke * 0.84)))
    draw.ellipse((cx - w * 0.026, cy - h * 0.055, cx + w * 0.026, cy - h * 0.01), fill=accent)
    dot_y = y1 - h * 0.18
    for i in (-1, 0, 1):
        dx = i * w * 0.08
        dot_half = max(7, int(w * 0.018))
        draw.rounded_rectangle((cx + dx - dot_half, dot_y - dot_half, cx + dx + dot_half, dot_y + dot_half), radius=max(4, int(dot_half * 0.6)), fill=accent)


def draw_seal_totem(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], dark: bool) -> None:
    x0, y0, x1, y1 = box
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2
    w = x1 - x0
    h = y1 - y0
    stroke = max(10, int(w * 0.044))
    accent = rgba(PALETTE["ember_bright"] if dark else PALETTE["ember"])
    support = rgba(PALETTE["cream"] if dark else PALETTE["ink"])
    muted = rgba(PALETTE["paper"], 54) if dark else rgba(PALETTE["mist_dark"], 46)

    draw.ellipse((x0 + w * 0.08, y0 + h * 0.08, x1 - w * 0.08, y1 - h * 0.08), outline=muted, width=max(2, int(w * 0.007)))
    draw.ellipse((x0 + w * 0.15, y0 + h * 0.15, x1 - w * 0.15, y1 - h * 0.15), outline=muted, width=2)
    for angle in range(0, 360, 24):
        length = 26 if angle % 48 == 0 else 16
        rad = math.radians(angle - 90)
        inner_r = w * 0.36
        outer_r = inner_r + length
        x_start = cx + math.cos(rad) * inner_r
        y_start = cy + math.sin(rad) * inner_r
        x_end = cx + math.cos(rad) * outer_r
        y_end = cy + math.sin(rad) * outer_r
        draw.line((x_start, y_start, x_end, y_end), fill=muted, width=3)

    draw.arc((x0 + w * 0.19, y0 + h * 0.15, x0 + w * 0.44, y0 + h * 0.39), start=208, end=20, fill=accent, width=max(7, int(stroke * 0.78)))
    draw.arc((x1 - w * 0.44, y0 + h * 0.15, x1 - w * 0.19, y0 + h * 0.39), start=160, end=332, fill=accent, width=max(7, int(stroke * 0.78)))
    draw.line((cx, y0 + h * 0.31, cx, y1 - h * 0.31), fill=support, width=max(6, int(stroke * 0.72)))
    draw.ellipse((cx - w * 0.032, y0 + h * 0.34, cx + w * 0.032, y0 + h * 0.41), fill=accent, outline=support, width=max(3, int(w * 0.008)))
    draw.ellipse((cx - w * 0.024, cy - h * 0.024, cx + w * 0.024, cy + h * 0.024), fill=accent)
    draw.arc((cx - w * 0.20, y1 - h * 0.49, cx + w * 0.20, y1 - h * 0.10), start=204, end=336, fill=support, width=stroke)
    draw.line((cx - w * 0.23, y1 - h * 0.24, cx - w * 0.29, y1 - h * 0.18), fill=support, width=max(5, int(stroke * 0.74)))
    draw.line((cx + w * 0.23, y1 - h * 0.24, cx + w * 0.29, y1 - h * 0.18), fill=support, width=max(5, int(stroke * 0.74)))


VARIANTS = [
    {
        "slug": "route-badge",
        "study": "Study A",
        "title": "Route Badge",
        "subtitle": "protective claw + guided path",
        "note": "The claws work like brackets around a\nbeginner route, turning the mark into a\nbadge for guided progress rather than raw power.",
        "renderer": draw_route_badge,
    },
    {
        "slug": "face-structure",
        "study": "Study B",
        "title": "Face Structure",
        "subtitle": "friendly recognition at first glance",
        "note": "This keeps the immediate friendliness of\nthe current temporary icon, but rebuilds it\nwith plated geometry and clearer hierarchy.",
        "renderer": draw_face_structure,
    },
    {
        "slug": "letter-fusion",
        "study": "Study C",
        "title": "Letter Fusion",
        "subtitle": "o / c merged into the claw silhouette",
        "note": "The mark hides the initials inside a single\nloop, making it strongest at favicon size while\nstill reading as a calm claw emblem.",
        "renderer": draw_letter_fusion,
    },
    {
        "slug": "seal-totem",
        "study": "Study D",
        "title": "Seal Totem",
        "subtitle": "editorial stamp with ritual precision",
        "note": "This option behaves like a seal or printed\nimprint, which makes it a good fit for a\ncurated guide brand with strong editorial taste.",
        "renderer": draw_seal_totem,
    },
]


def draw_symbol_panel(
    image: Image.Image,
    box: tuple[int, int, int, int],
    renderer,
    variant_slug: str,
) -> None:
    draw_card(image, box, radius=42, fill=PALETTE["charcoal_soft"], outline="#FFFFFF", outline_alpha=30)
    inner = (box[0] + 26, box[1] + 26, box[2] - 26, box[3] - 26)
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.rounded_rectangle(inner, radius=34, fill=rgba(PALETTE["charcoal"]), outline=rgba(PALETTE["paper"], 28), width=1)
    for i in range(5):
        pad = 42 + i * 24
        draw.arc(
            (inner[0] + pad, inner[1] + pad - 18, inner[2] - pad, inner[3] - pad + 80),
            start=198,
            end=338,
            fill=rgba(PALETTE["paper"], 20 if i == 0 else 14),
            width=2,
        )
    renderer(draw, (inner[0] + 88, inner[1] + 88, inner[2] - 88, inner[3] - 88), dark=True)
    draw_spaced_text(
        draw,
        (inner[0] + 38, inner[1] + 30),
        variant_slug.upper().replace("-", " / "),
        font("mono", 18),
        rgba(PALETTE["paper"], 155),
        4,
    )
    image.alpha_composite(layer)


def draw_info_panel(
    image: Image.Image,
    box: tuple[int, int, int, int],
    renderer,
    title: str,
    subtitle: str,
    note: str,
) -> None:
    draw_card(image, box, radius=42, fill=PALETTE["paper"], outline="#FFFFFF", outline_alpha=90)
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw_wordmark(draw, (box[0] + 56, box[1] + 58), dark=False, scale=1.0)
    draw.text((box[0] + 58, box[1] + 246), title, font=font("serif", 56), fill=rgba(PALETTE["ink"]))
    draw.text((box[0] + 60, box[1] + 318), subtitle, font=font("mono_bold", 23), fill=rgba(PALETTE["ember"]))
    draw.multiline_text(
        (box[0] + 58, box[1] + 374),
        note,
        font=font("display_regular", 28),
        fill=rgba(PALETTE["mist_dark"], 230),
        spacing=10,
    )

    chip_one = (box[0] + 56, box[1] + 560, box[0] + 290, box[1] + 808)
    chip_two = (box[0] + 320, box[1] + 560, box[0] + 554, box[1] + 808)
    for chip in (chip_one, chip_two):
        draw.rounded_rectangle(chip, radius=30, fill=rgba(PALETTE["cream"]), outline=rgba(PALETTE["mist_dark"], 44), width=1)
    draw.rounded_rectangle(chip_one, radius=30, fill=rgba(PALETTE["cream"]), outline=rgba(PALETTE["mist_dark"], 44), width=1)
    draw.rounded_rectangle(chip_two, radius=30, fill=rgba(PALETTE["charcoal_soft"]), outline=rgba(PALETTE["paper"], 36), width=1)
    draw_spaced_text(draw, (chip_one[0] + 20, chip_one[1] + 18), "LIGHT APP", font("mono", 15), rgba(PALETTE["mist_dark"], 160), 2)
    draw_spaced_text(draw, (chip_two[0] + 20, chip_two[1] + 18), "DARK APP", font("mono", 15), rgba(PALETTE["paper"], 170), 2)
    renderer(draw, (chip_one[0] + 36, chip_one[1] + 54, chip_one[0] + 194, chip_one[1] + 212), dark=False)
    renderer(draw, (chip_two[0] + 36, chip_two[1] + 54, chip_two[0] + 194, chip_two[1] + 212), dark=True)
    draw_wordmark(draw, (chip_one[0] + 42, chip_one[1] + 214), dark=False, scale=0.32, compact=True)
    draw_wordmark(draw, (chip_two[0] + 42, chip_two[1] + 214), dark=True, scale=0.32, compact=True)
    image.alpha_composite(layer)


def make_preview(variant: dict, seed: int) -> Image.Image:
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), rgba(PALETTE["charcoal"]))
    draw_background(canvas, seed=seed)
    draw = ImageDraw.Draw(canvas)
    draw_label_block(draw, variant["title"], variant["study"], variant["note"])
    draw_symbol_panel(canvas, (120, 470, 940, 1160), variant["renderer"], variant["slug"])
    draw_info_panel(canvas, (990, 196, 1680, 1160), variant["renderer"], variant["title"], variant["subtitle"], variant["note"])
    return canvas


def make_contact_sheet(images: list[tuple[dict, Image.Image]]) -> Image.Image:
    thumb_width = 760
    thumb_height = int(thumb_width * HEIGHT / WIDTH)
    canvas = Image.new("RGBA", (1700, 1360), rgba(PALETTE["charcoal"]))
    draw_vertical_gradient(canvas, "#0A0D10", "#161B22")
    add_radial_glow(canvas, (420, 180), 320, PALETTE["ember"], 220)
    add_grain(canvas, 999)
    draw = ImageDraw.Draw(canvas)
    draw_spaced_text(draw, (92, 70), "OPENCLAW101 / TASK 5 / LOGO PREVIEWS", font("mono", 20), rgba(PALETTE["paper"], 178), 4)
    draw.text((92, 118), "Four first-round directions", font=font("serif", 66), fill=rgba(PALETTE["paper"]))
    draw.text((94, 208), "Each board shows the same brand system on dark and light surfaces.", font=font("display_regular", 26), fill=rgba(PALETTE["paper"], 200))
    positions = [(90, 286), (850, 286), (90, 798), (850, 798)]
    for (variant, image), (x, y) in zip(images, positions, strict=True):
        thumb = image.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        box = (x, y, x + thumb_width, y + thumb_height)
        draw_card(canvas, box, radius=28, fill=PALETTE["charcoal_soft"], outline="#FFFFFF", outline_alpha=28)
        canvas.alpha_composite(thumb, (x, y))
        draw.rounded_rectangle((x + 22, y + 22, x + 242, y + 82), radius=18, fill=rgba(PALETTE["charcoal"], 190))
        draw.text((x + 42, y + 34), variant["study"], font=font("mono_bold", 18), fill=rgba(PALETTE["paper"]))
    return canvas


def main() -> None:
    generated: list[tuple[dict, Image.Image]] = []
    for index, variant in enumerate(VARIANTS, start=1):
        image = make_preview(variant, seed=100 + index)
        image.save(OUTPUTS[variant["slug"]])
        generated.append((variant, image))
    contact = make_contact_sheet(generated)
    contact.save(CONTACT_SHEET)
    print("Generated:")
    for path in OUTPUTS.values():
        print(f"- {path}")
    print(f"- {CONTACT_SHEET}")


if __name__ == "__main__":
    main()
