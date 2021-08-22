
const { fake } = require('faker');
const faker = require('faker');
const fs = require('fs');

faker.locale = "vi";


randomCitiesList = () => {
    const citiesList = [];
    ["TP Hồ Chí Minh","Hà Nội","Tây Ninh","Bình Dương","Long An"].map(value => {
        const city = {
            id: faker.random.uuid(),
            name: value,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        citiesList.push(city);
    })

    return citiesList;
}

randomStudentList = (citiesList, numberOfCity) => {
    if(numberOfCity <= 0) return [];
    const studentList = [];

    for (const city of citiesList) {
        Array.from(new Array(numberOfCity)).forEach(() => {
            const student = {
                cityId: city.id,
                id: faker.random.uuid(),
                name: faker.name.findName(),
                sex: faker.random.boolean() ? 'male' : 'female',
                dob: faker.date.past(),
                phone: faker.phone.phoneNumberFormat(),
                address: faker.address.streetAddress(),
                score: parseFloat((Math.random() * (10 - 1) + 1).toFixed(2)),
                imageUrl: faker.image.imageUrl(400,400),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            studentList.push(student);
        })
    }

    return studentList;

}


// IFFE
(() => {

    const citiesList = randomCitiesList();
    const studentsList = randomStudentList(citiesList, 30);

    const db = {
        cities:citiesList,
        students: studentsList
    }

    fs.writeFile('db.json',JSON.stringify(db),
    () => {
        console.log("Write successfully");
    });
})()
