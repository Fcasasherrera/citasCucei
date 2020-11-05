import axios from 'axios';
let url = 'https://cuceimobile.tech/Escuela/datosudeg.php'
let urlLocal = 'https://proyectoreactprogramacionweb.000webhostapp.com/'

export const loginUDG = ({codigo, nip}) => {
    url += `?codigo=${codigo}&nip=${nip}`
    return new Promise<>((resolve, reject) => {
        axios.get(url)
            .then(res => {
                if (res.data === 0) {
                    resolve('err');
                }
                let response = {
                    name: res.data.split(',')[2],
                    codigo: res.data.split(',')[1],
                    carrera: res.data.split(',')[4],
                }
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const insertCite = ({ dayWeek, month, day, hour, code, name, carreer }) => {
    urlLocal = `https://proyectoreactprogramacionweb.000webhostapp.com/altaCitas.php?diasemana=${dayWeek}&mes=${month}&dia=${day}&hora=${hour}&codigo=${code}&nombre=${name}&carrera=${carreer}`
    return new Promise<String>((resolve, reject) => {
        axios.get(urlLocal)
            .then(res => {
                console.log(res.data);
                
                if (res.data === 0) {
                    resolve('err');
                } else if (res.data === 2) {
                    resolve('ya existe la cita');
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const getCitesCode = (code) => {
    urlLocal = `https://proyectoreactprogramacionweb.000webhostapp.com/verCitas.php?codigo=${code}`
    return new Promise<[]>((resolve, reject) => {
        axios.get(urlLocal)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}