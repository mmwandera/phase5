from config import db, app, bcrypt
from models import Student, Admin, Course, Module, Message
from faker import Faker
import random
from sqlalchemy import func

fake = Faker()

app.app_context().push()

# Function to generate fake data for Student
def generate_fake_student():
    email = fake.email()
    username = fake.user_name()
    password = f"{username}@1234"  # Generating password based on username
    student = Student(email=email, username=username)
    student.password_hash = password
    return student

# Function to generate fake data for Admin
def generate_fake_admin():
    email = fake.email()
    name = fake.name()
    password = f"{name.split()[0]}@1234"  # Generating password based on admin's first name
    admin = Admin(email=email, name=name)
    admin.password_hash = password
    return admin

# Function to generate fake data for Course
def generate_fake_course(admin):
    title = fake.sentence(nb_words=4)
    description = fake.paragraph()
    thumbnail = fake.image_url()
    price = round(random.uniform(10, 100), 2)
    course = Course(title=title, description=description, thumbnail=thumbnail, price=price, admin_id=admin.id)
    return course


# Function to generate fake data for Module
def generate_fake_module(course):
    title = fake.sentence(nb_words=3)
    media = fake.url()  # Using url() to generate a fake URL
    notes = fake.paragraph()
    return Module(title=title, media=media, notes=notes, course=course)

# Function to generate fake data for Message
def generate_fake_message(student):
    title = fake.sentence(nb_words=6)
    content = fake.paragraph(nb_sentences=3)
    return Message(title=title, content=content, student=student)

# Seed function to populate the database
def seed_database():
    try:
        # Create some fake admins
        admins = [generate_fake_admin() for _ in range(3)]
        db.session.add_all(admins)
        db.session.commit()
        print("✅ Created fake admins.")

        # Create some fake students
        students = [generate_fake_student() for _ in range(5)]
        db.session.add_all(students)
        db.session.commit()
        print("✅ Created fake students.")

        # Create some courses for each admin
        for admin in admins:
            courses = [generate_fake_course(admin) for _ in range(2)]
            db.session.add_all(courses)
            db.session.commit()

        # Create some modules for each course
        for course in Course.query.all():
            modules = [generate_fake_module(course) for _ in range(random.randint(2, 4))]
            db.session.add_all(modules)
            db.session.commit()
        print("✅ Created modules for each course.")

        print("✅ Seeding completed successfully!")

    except Exception as e:
        db.session.rollback()
        print("❌ Seeding failed:", str(e))

if __name__ == '__main__':
    seed_database()