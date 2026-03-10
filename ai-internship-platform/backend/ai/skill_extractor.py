import PyPDF2

skills_db = [
    "python",
    "java",
    "javascript",
    "react",
    "html",
    "css",
    "flask",
    "django",
    "mongodb",
    "sql",
    "machine learning",
    "data science"
]

def extract_skills_from_resume(file_path):

    text = ""

    pdf = PyPDF2.PdfReader(file_path)

    for page in pdf.pages:
        text += page.extract_text()

    text = text.lower()

    found_skills = []

    for skill in skills_db:
        if skill in text:
            found_skills.append(skill)

    return found_skills