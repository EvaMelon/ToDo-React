console.log("Hi");


let students_struct = [
    {
        name: "Mauk",
        surname: "Minuj",
        grades: [3, 5, 6]
    },
    {
        name: "Michal",
        surname: "Melon",
        grades: [3, 3, 3]
    }
];

const student_struct = students_struct[0];

display(student_struct);

function display(student) {
    console.log(`--- ${student.name} ${student.surname} ---`);
    console.log(`Grades  : ${student.grades.join(", ")}`);
    let avg = gradesAvg(student);
    console.log(`Average : ${avg}`);
}

function gradesAvg(student) {
    // let sum = 0;
    // for (let grade of student.grades) {
    //     sum += grade;
    // }
    // return (sum / student.grades.length).toFixed(2);
}




// display(student);

// student.display();
class Person {
    constructor(nm, surn) {
        this.name=nm;
        this.surname=surn;
    }

    introduce() {
        console.log(`--- ${this.name} ${this.surname}! ---`); 
    }

    display() {
        this.introduce();
        console.log("I'm just a person");
    }
}

let p = new Person("Ewa", "M");
p.display();

class Student extends Person {

    constructor(nm, surn, grd) {
        super(nm, surn);
        this.grades = grd;
    }

    display() {
        this.introduce();
        console.log(`Grades  : ${this.grades.join(", ")} ---`);
        let avg = this.gradesAvg();
        console.log(`Average : ${avg}`);
    }

    gradesAvg() {
        let sum = 0;
        for (let grade of this.grades) {
            sum += grade;
        }
        return (sum / this.grades.length).toFixed(2);
    }
}

let students = [
    new Student("Mauko", "Minujo", [6, 6, 6]),
    new Student("Bartek", "B", [6, 6, 7])    
];

// let student = students[1];

// student.name = "ewa";

//console.log(">>> avg", students[1].gradesAvg());



students[0].display();
students[1].display();

// Student

// --- Pola ---
// name
// surname
// grades
// --- Metody ---
// gradesAvg()
// display()
//