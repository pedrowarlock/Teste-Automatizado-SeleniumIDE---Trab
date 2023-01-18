import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import TextMask from 'react-text-mask';

function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        phone: "",
        birthday: "",
        gender: ""
    });
    const [formSubmissions, setFormSubmissions] = useState([]);
    const [error, setError] = useState(false);
    const [validationError, setValidationError] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            setValidationError(true);
            return;
        }
        setValidationError(false);
        const emailExists = formSubmissions.some(submission => submission.email === formData.email);
        if (emailExists) {
            setError(true);
            return;
        }
        setError(false);
        setFormSubmissions([...formSubmissions, formData]);
    };

    const handleDelete = (index) => {
        const updatedSubmissions = formSubmissions.filter((submission, i) => i !== index);
        setFormSubmissions(updatedSubmissions);
    }

    return (
        <div>

            {error && <div className="alert alert-danger">Email já foi utilizado.</div>}
            {validationError && <div className="alert alert-danger">Por favor, preencha todos os campos obrigatórios.</div>}


            <div className="card mx-auto" style={{ width: "48rem", gap: "5px", margin: "5%"}}>
                <form onSubmit={handleSubmit}>


                    <h5 className="card-header">Cadastro:</h5>

                    <div style={{ padding: "1%" }} >
                        <div className="form-group" style={{ width: "18rem" }}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Insira seu nome completo"
                                required
                            />
                        </div>
                        <div className="form-group" style={{ width: "15rem" }}>
                            <label>Email:</label>
                            <input
                                placeholder="exemplo@email.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div style={{ display: "flex", gap:"25px"}}>

                            <div className="form-group" style={{ width: "10rem" }}>
                                <label>Telefone:</label>
                                <TextMask
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="(__) _____-____"
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ width: "10rem" }}>
                                <label>Data de Nascimento:</label>
                                <input

                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ margin:"10px" }}>
                            <label style={{ marginRight:"10px" }}>Gênero:</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="Masculino"
                                    checked={formData.gender === "Masculino"}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="Masculino">Masculino</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="Feminino"
                                    checked={formData.gender === "Feminino"}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="Feminino">Feminino</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="Outros"
                                    checked={formData.gender === "Outros"}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="Outros">Outros</label>
                            </div>

                        </div>


                        <button type="submit" className="btn btn-primary">Enviar</button>

                    </div>
                </form>
                </div>

                {formSubmissions.length > 0 &&
                    <div style={{ margin: "10px" }}>
                        <h5 className="card-header">Dados:</h5>
                    <table className="table" style={{ width: "-1%" }}  >
                        <thead >
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Idade</th>
                                <th>Gênero</th>
                                <th></th>
                            </tr>
                        </thead>


                        <tbody>
                            {formSubmissions.map((submission, index) => (
                                <tr style={{ whiteSpace: 'nowrap' }} key={submission.id}>
                                    <td >{submission.name}</td>
                                    <td >{submission.email}</td>
                                    <td >{submission.phone}</td>
                                    <td>{submission.birthday}</td>
                                    <td>{submission.gender}</td>
                                    <td><button onClick={() => handleDelete(index)} className="btn btn-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

            
        </div>
    );
}

export default Form;
