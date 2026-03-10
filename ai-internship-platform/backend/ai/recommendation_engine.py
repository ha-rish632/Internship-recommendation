from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_internships(student_skills, internships):

    documents = []

    for job in internships:
        documents.append(" ".join(job["skills"]))

    documents.append(" ".join(student_skills))

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(vectors[-1], vectors[:-1])

    scores = similarity[0]

    ranked = sorted(
        list(zip(internships, scores)),
        key=lambda x: x[1],
        reverse=True
    )

    results = []

    for job,score in ranked:

        job["_id"] = str(job["_id"])
        job["match_score"] = round(score*100,2)

        results.append(job)

    return results