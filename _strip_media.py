from pathlib import Path


def strip_media(css: str) -> str:
    out = []
    i = 0
    n = len(css)
    while i < n:
        m = css.find("@media", i)
        if m == -1:
            out.append(css[i:])
            break
        out.append(css[i:m])
        brace = css.find("{", m)
        if brace == -1:
            break
        depth = 1
        j = brace + 1
        while j < n and depth:
            if css[j] == "{":
                depth += 1
            elif css[j] == "}":
                depth -= 1
            j += 1
        i = j
    text = "".join(out)
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    return text.rstrip() + "\n"


root = Path(r"c:\github\Bandung\css")
for name in ("style.css", "map.css"):
    path = root / name
    original = path.read_text(encoding="utf-8")
    cleaned = strip_media(original)
    path.write_text(cleaned, encoding="utf-8")
    print(f"{name}: {original.count(chr(10))+1} -> {cleaned.count(chr(10))+1} lines")
