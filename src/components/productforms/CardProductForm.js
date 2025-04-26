import { Form } from 'react-bootstrap';
import { useState } from 'react';
import '../../styles/components/forms/forms.scss';
const CardProductForm = () => {

    const [cardStock, setCardStock] = useState('default');
    const handleCardStock = (event) => {
        setCardStock(event.target.value);
    }

    return (
       <Form.Select onChange={handleCardStock} aria-label="card stock selection" className="card-stock-select">
            <option value="default">Standard</option>
            <option value="gloss">Gloss</option>
            <option value="matte">Matte</option>
            <option value="uncoated">Uncoated</option>
       </Form.Select> 
    )
}

export default CardProductForm;