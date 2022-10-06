    let animals = ['Giraffe', 'Lion', 'Elephants', 'Yak', 'Tiger' ]

    animals.forEach(function (animal_s, index) {
        console.log(index, animal_s)
    } )

    animals.forEach( (animal, index) => {
    console.log(animal, index)
    } )

    animals.forEach(function (animal) {
        console.log(animal);
    })

    animals.forEach( (animal) => {
        console.log(animal)
    })

    animals.forEach(animal => console.log(animal))