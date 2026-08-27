from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "rutina-carta-30-fuerte.pdf"


DAYS = [
    {
        "day": "LUNES",
        "name": "SUPERIOR A",
        "focus": "Pecho + espalda",
        "rounds": [
            "Flexiones inclinadas 10-12",
            "Remo con pesas 12-15",
            "Press hombros 10-12",
            "Curl biceps 12-15",
        ],
    },
    {
        "day": "MARTES",
        "name": "INFERIOR A",
        "focus": "Cuadriceps + gluteo",
        "rounds": [
            "Sentadilla con pesas 12",
            "Zancada atras 8 c/pierna",
            "Puente gluteos 15",
            "Talones 18-20",
        ],
    },
    {
        "day": "MIERCOLES",
        "name": "MULTIFUNCIONAL A",
        "focus": "Cardio + cuerpo completo",
        "rounds": [
            "Burpee adaptado 6-8",
            "Peso muerto rumano 12",
            "Remo inclinado 12",
            "Rodillas arriba 30 seg",
        ],
    },
    {
        "day": "JUEVES",
        "name": "SUPERIOR B",
        "focus": "Hombro + core",
        "rounds": [
            "Press hombros 10-12",
            "Remo inclinado 12-15",
            "Flexiones 8-12",
            "Dead bug 10 c/lado",
        ],
    },
    {
        "day": "VIERNES",
        "name": "INFERIOR B",
        "focus": "Posterior + estabilidad",
        "rounds": [
            "Peso muerto rumano 12",
            "Sentadilla sin peso 15",
            "Zancada atras 8 c/pierna",
            "Puente gluteos 15",
        ],
    },
    {
        "day": "SABADO",
        "name": "MULTIFUNCIONAL B",
        "focus": "Resistencia total",
        "rounds": [
            "Burpee adaptado 6",
            "Sentadilla con pesas 12",
            "Remo con pesas 12",
            "Escaladores lentos 20",
        ],
    },
]


def fit_text(c, text, max_width, size, font="Helvetica"):
    if stringWidth(text, font, size) <= max_width:
        return text
    ellipsis = "..."
    while text and stringWidth(text + ellipsis, font, size) > max_width:
        text = text[:-1]
    return text + ellipsis


def checkbox(c, x, y, size=8, label="", font_size=7.2):
    c.rect(x, y, size, size, stroke=1, fill=0)
    if label:
        c.setFont("Helvetica", font_size)
        c.setFillColor(colors.black)
        c.drawString(x + size + 4, y + 1, label)


def card(c, x, y, w, h, item):
    c.setFillColor(colors.white)
    c.roundRect(x, y, w, h, 10, stroke=1, fill=1)
    c.setFillColor(colors.black)
    c.roundRect(x, y + h - 31, w, 31, 10, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 10, y + h - 18, item["day"])
    c.setFont("Helvetica-Bold", 8)
    c.drawRightString(x + w - 10, y + h - 18, item["name"])

    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(x + 10, y + h - 46, item["focus"])
    c.setFont("Helvetica", 7.2)
    c.drawString(x + 10, y + h - 58, "Base: 4 min movilidad + 8 min lazo moderado")
    c.drawString(x + 10, y + h - 69, "Circuito: 2-3 rondas, 30-45 seg descanso")

    start_y = y + h - 88
    for i, exercise in enumerate(item["rounds"], start=1):
        row_y = start_y - (i - 1) * 16
        c.setFont("Helvetica-Bold", 7.6)
        c.drawString(x + 10, row_y + 2, f"{i}.")
        c.setFont("Helvetica", 7.6)
        c.drawString(x + 24, row_y + 2, fit_text(c, exercise, w - 92, 7.6))
        checkbox(c, x + w - 58, row_y, 7, "R1", 6.2)
        checkbox(c, x + w - 36, row_y, 7, "R2", 6.2)

    c.setStrokeColor(colors.black)
    c.line(x + 10, y + 30, x + w - 10, y + 30)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(x + 10, y + 18, "Extra opcional:")
    c.setFont("Helvetica", 7)
    c.drawString(x + 71, y + 18, "R3 si tecnica sigue limpia")
    checkbox(c, x + w - 42, y + 15, 8, "R3", 7)
    c.drawString(x + 10, y + 6, "Cierre: 3 min caminar/respirar. Sin dolor.")


def draw_poster():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=landscape(letter))
    width, height = landscape(letter)
    margin = 22

    c.setTitle("Rutina carta 30 Fuerte")
    c.setAuthor("Codex")

    # Header
    c.setFillColor(colors.black)
    c.rect(0, height - 72, width, 72, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(margin, height - 34, "30 FUERTE - RUTINA IMPRESA")
    c.setFont("Helvetica", 10)
    c.drawString(margin, height - 54, "Sin celular al entrenar: marca rondas, controla esfuerzo y deja notas en una sola hoja carta.")
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(width - margin, height - 34, "6 DIAS")
    c.setFont("Helvetica", 8.5)
    c.drawRightString(width - margin, height - 51, "Superior / Inferior / Multifuncional x 2")

    # Principles strip
    y = height - 105
    boxes = [
        ("Cardio controlado", "8 min lazo, no a maximo"),
        ("Fuerza real", "2-3 rondas por dia"),
        ("HIIT medido", "burpees adaptados"),
        ("Salud primero", "si hay dolor, parar"),
    ]
    bw = (width - margin * 2 - 18) / 4
    for i, (title, body) in enumerate(boxes):
        x = margin + i * (bw + 6)
        c.setFillColor(colors.Color(0.94, 0.94, 0.90))
        c.roundRect(x, y, bw, 25, 7, stroke=0, fill=1)
        c.setFillColor(colors.black)
        c.setFont("Helvetica-Bold", 7.6)
        c.drawString(x + 7, y + 14, title)
        c.setFont("Helvetica", 7)
        c.drawString(x + 7, y + 5, body)

    # Cards
    card_w = (width - margin * 2 - 16) / 3
    card_h = 169
    top_y = height - 286
    gap_x = 8
    gap_y = 8
    for i, item in enumerate(DAYS):
        col = i % 3
        row = i // 3
        x = margin + col * (card_w + gap_x)
        cy = top_y - row * (card_h + gap_y)
        card(c, x, cy, card_w, card_h, item)

    # Tracker footer
    footer_y = margin
    footer_h = 91
    c.setFillColor(colors.white)
    c.roundRect(margin, footer_y, width - margin * 2, footer_h, 10, stroke=1, fill=1)
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 10, footer_y + footer_h - 18, "TRACK SEMANAL")
    c.setFont("Helvetica", 7.6)
    fields = ["Semana", "Peso kg", "Cintura cm", "Sueno promedio", "Energia 1-5", "Dolor/molestia"]
    x = margin + 10
    for field in fields:
        c.drawString(x, footer_y + footer_h - 38, field + ":")
        c.line(x + 52, footer_y + footer_h - 39, x + 116, footer_y + footer_h - 39)
        x += 122

    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 10, footer_y + 35, "Dias hechos:")
    x = margin + 78
    for label in ["L", "M", "X", "J", "V", "S"]:
        checkbox(c, x, footer_y + 32, 9, label, 8)
        x += 37

    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 330, footer_y + 35, "Observaciones:")
    c.line(margin + 410, footer_y + 36, width - margin - 10, footer_y + 36)
    c.line(margin + 410, footer_y + 18, width - margin - 10, footer_y + 18)

    c.setFont("Helvetica", 6.7)
    c.drawString(
        margin + 10,
        footer_y + 8,
        "Referencia general: CDC y AHA recomiendan actividad aerobica semanal y fuerza al menos 2 dias. Para colesterol o sintomas, ajusta con tu medico.",
    )

    c.showPage()
    c.save()


if __name__ == "__main__":
    draw_poster()
    print(OUT)
