import os

docs_dir = r"c:\Program Files (x86)\Accuver\testcase_database-main\docs"
for filename in os.listdir(docs_dir):
    if filename.startswith("TC_") and filename.endswith(".md"):
        filepath = os.path.join(docs_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            if line.startswith("|") and line.endswith("|\n") or line.endswith("|\r\n") or (line.startswith("|") and line[-1] == '|'):
                line = line.rstrip("\r\n")
                if not line.startswith("|-"):
                    # Header or Row
                    if "TC Title" in line or "| #" in line:
                        new_lines.append(line + " Detail |\n")
                    else:
                        new_lines.append(line + " View |\n")
                elif line.startswith("|-"):
                    new_lines.append(line + "---|\n")
            else:
                new_lines.append(line)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.writelines(new_lines)
print("done")
