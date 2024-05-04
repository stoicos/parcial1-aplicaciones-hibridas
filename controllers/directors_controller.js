import Director from '../models/directors_model.js'

async function getDirectors() {
    let directors = await Director.find({ status: true })
    return directors
}

async function getDirectorBySurname(req) {
    let director = await Director.findOne({ surname: { $regex: req.params.surname, $options: 'i' } });
    return director
}

async function getDirectorById(req) {
    let director = await Director.findOne({ _id : req.params.id });
    return director
}

async function createDirector(req) {
    let newDirector = new Director({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        status: true
    })
    return await newDirector.save()
}

async function updateDirector(id, body) {
    let updatedDirector = await Director.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            surname: body.surname,
            age: body.age
        }
    }, { new: true })
    return updatedDirector
}

async function deactivateDirector(id) {
    let deactivatedDirector = await Director.findByIdAndUpdate(id, {
        $set: {
            status: false
        }
    }, { new: true })
    return deactivatedDirector
}

export { getDirectors, createDirector, updateDirector, deactivateDirector, getDirectorBySurname, getDirectorById }