    let message:string="hello all";
    console.log(message);

function test(text:string):string {
    return text;
}
    console.log(test("hi typescript"));


interface shaik {
    name: string;
    content: string;
    email?: string;
}
const person: shaik = {
    name: "Nagurvali",
    content: "Learning TypeScript",
    email:"shaik@gmail.com"
};
console.log(person);

    class Student {
        id: number;
        name: string;

        constructor(id: number = 0, name: string = "Unknown") {
            this.id = id;
            this.name = name;
        }

        display(): void {
            console.log("ID:", this.id);
            console.log("Name:", this.name);
        }
    }

    const s1 = new Student();                  // Uses default values
    const s2 = new Student(101, "Nagurvali");  // Uses provided values

    s1.display();
    s2.display();


    class student {
        public name: string;
        private age: number;
        protected course: string;

        constructor(name: string, age: number, course: string) {
            this.name = name;
            this.age = age;
            this.course = course;
        }

        display(): void {
            console.log("Name:", this.name);
            console.log("Age:", this.age);
            console.log("Course:", this.course);
        }
    }

    const s = new Student("Nagurvali", 22, "TypeScript");

    console.log(s.name);   // ✅ Public is accessible
    // console.log(s1.age); // ❌ Error: Private
    // console.log(s1.course); // ❌ Error: Protected

    s1.display();

    function display<T>(value: T): T {
        return value;
    }

    console.log(display<number>(100));
    console.log(display<string>("Hello"));
    console.log(display<boolean>(true));

    let value: any;

    value = 100;
    console.log(value);

    value = "Hello";
    console.log(value);

    value = true;
    console.log(value);