from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from ai.skill_extractor import extract_skills_from_resume
from ai.recommendation_engine import recommend_internships
import os


app = Flask(__name__)
CORS(app)
PORT = int(os.environ.get("PORT", 5000))

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["ai_internship_db"]

users = db["users"]
internships = db["internships"]
applications = db["applications"]

@app.route("/")
def home():
    return jsonify({"message": "Backend Running"})

# -----------------------------
# Register Student
# -----------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": data["password"]
    }

    users.insert_one(user)

    return jsonify({"message": "User registered successfully"})


# -----------------------------
# Login
# -----------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users.find_one({
        "email": data["email"],
        "password": data["password"]
    })

    if user:
        return jsonify({"message": "Login success"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# -----------------------------
# Add Internship (Admin)
# -----------------------------
@app.route("/add-internship", methods=["POST"])
def add_internship():
    data = request.json

    internship = {
        "title": data["title"],
        "company": data["company"],
        "skills": data["skills"],
        "location": data["location"]
    }

    internships.insert_one(internship)

    return jsonify({"message": "Internship added"})


# -----------------------------
# Get Internships
# -----------------------------
@app.route("/internships", methods=["GET"])
def get_internships():

    data = []

    for i in internships.find():
        i["_id"] = str(i["_id"])
        data.append(i)

    return jsonify(data)


# -----------------------------
# Resume Upload
# -----------------------------
@app.route("/upload-resume", methods=["POST"])
def upload_resume():

    file = request.files["resume"]

    path = "resume.pdf"

    file.save(path)

    skills = extract_skills_from_resume(path)

    return jsonify({
        "message": "Resume uploaded",
        "skills_found": skills
    })

# -----------------------------
# Simple AI Recommendation
# -----------------------------
@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json
    student_skills = data["skills"]

    internships_list = list(internships.find())

    results = recommend_internships(student_skills, internships_list)

    return jsonify(results)

@app.route("/create-sample")
def create_sample():

    internships.insert_one({
        "title":"Frontend Developer Intern",
        "company":"Google",
        "skills":["HTML","CSS","JavaScript","React"],
        "location":"Remote"
    })

    internships.insert_one({
        "title":"Python Developer Intern",
        "company":"Microsoft",
        "skills":["Python","Flask","API"],
        "location":"Bangalore"
    })

    return {"message":"Sample internships added"}

@app.route("/profile/<email>")
def get_profile(email):

    user = users.find_one({"email": email})

    if user:
        user["_id"] = str(user["_id"])
        return jsonify(user)
    else:
        return jsonify({"message":"User not found"})
@app.route("/apply", methods=["POST"])
def apply():

    data = request.json

    application = {
        "student_email": data["email"],
        "internship_id": data["internship_id"]
    }

    applications.insert_one(application)

    return jsonify({"message":"Application submitted"})

if __name__ == "__main__":
    app.run(debug=True)