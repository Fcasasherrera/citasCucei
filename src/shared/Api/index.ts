import axios from 'axios';
let url = 'https://cuceimobile.tech/Escuela/datosudeg.php'
let urlLocal = 'https://proyectoreactprogramacionweb.000webhostapp.com/'
let urlMarcos = 'https://servidordepruebaparalatarea.000webhostapp.com/'


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
export const loginAdmin = ({ user, pass }) => {
    const endpoint = `loginAdmin.php?user=${user}&pass=${pass}`
    return new Promise<>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                if (res.data === 0) {
                    resolve('err');
                }
                let response = {
                    name: res.data[0].usuario,
                    codigo: '',
                    carrera: res.data[0].carrera,
                }
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const registerAdmin = ({ user, pass, carrera }) => {
    const endpoint = `altaAdmins.php?usuario=${user}&pass=${pass}&carrera=${carrera}`
    return new Promise<>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
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


export const insertCite = ({ dayWeek, month, day, hour, code, name, carreer }) => {
    const endpoint = `altaCitas.php?diasemana=${dayWeek}&mes=${month}&dia=${day}&hora=${hour}&codigo=${code}&nombre=${name}&carrera=${carreer}`
    return new Promise<String>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
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
    const endpoint = `verCitas.php?codigo=${code}`
    return new Promise<[]>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
function returnParams({ dayWeek, day }, carrera) {
    let endpointParams = 'getAllCites.php?'
    if (dayWeek === '-' || dayWeek === undefined) {
        // que NO hay dia de la semana
        if (day === '-' || day === undefined) {
            // que NO hay dia del mes
            return endpointParams + `carrera=${carrera}`
        } else {
            // que hay dia del mes
            return endpointParams + `carrera=${carrera}&day=${day}`
        }
    } else {
        // que hay dia de la semana
        if (day === '-' || day === undefined) {
            // que NO hay dia del mes, pero si hay de la semana
            return endpointParams + `carrera=${carrera}&dayWeek=${dayWeek}`
        } else {
            // que hay los dos
            return endpointParams + `carrera=${carrera}&dayWeek=${dayWeek}&day=${day}`
        }
    }
}
export const getCitesFilter = (params, carrera) => {
    const endpoint = returnParams(params, carrera);
    console.log(endpoint);
    return new Promise<[]>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const deleteCite = ({ month, day, hour, code, admin }) => {
    let endpoint = ``
    if (admin === '1') {
        endpoint = `bajasCitas.php?month=${month}&day=${day}&hour=${hour}&code=${code}&admin=1`
    } else {
        endpoint = `bajasCitas.php?month=${month}&day=${day}&hour=${hour}&code=${code}`
    }
    console.log(urlLocal + endpoint);
    return new Promise<[]>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const editCite = ({ id, code, dayWeek, month, day, hour, admin }) => {
    let endpoint = ``
    if (admin === '1') {
        endpoint = `editarCitas.php?id=${id}&code=${code}&diasemana=${dayWeek}&mes=${month}&dia=${day}&hora=${hour}&admin=1`
    } else {
        endpoint = `editarCitas.php?id=${id}&code=${code}&diasemana=${dayWeek}&mes=${month}&dia=${day}&hora=${hour}`
    }
    console.log(urlLocal + endpoint);
 
    return new Promise<String>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                console.log(res.data);

                if (res.data === 0) {
                    resolve('err');
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export const sendPush = () => {
    const endpoint = `push.php`
    
    console.log(urlLocal + endpoint);

    return new Promise<String>((resolve, reject) => {
        axios.get(urlLocal + endpoint)
            .then(res => {
                console.log(res.data);
                resolve('true');
            })
            .catch(err => {
                reject(err)
            })
    })
}
