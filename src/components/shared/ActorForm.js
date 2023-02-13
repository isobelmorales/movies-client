import { Form, Button, Container } from 'react-bootstrap'

const ActorForm = (props) => {
    const { actor, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the actor's name?"
                        name="name"
                        id="name"
                        value={ actor.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What is the actor's age?"
                        name="age"
                        id="age"
                        value={ actor.age }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this actor good at acting?"
                        name="isGoodAtActing"
                        defaultChecked={ actor.isGoodAtActing }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="actor list"
                        name="list"
                        defaultValue={actor.list}
                        onChange={handleChange}
                    >
                        <option>Select actor lsit</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ActorForm