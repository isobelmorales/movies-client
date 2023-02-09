import { Form, Button, Container } from "react-bootstrap";

const MovieForm = (props) => {
    const { movie, handleChange, handleSubmit, heading } = props
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="enter movie title"
                        name="name"
                        id="name"
                        value={ movie.name }
                        onChange={handleChange}
                    />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Release Date:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="year"
                        name="releaseDate"
                        id="release-date"
                        value={ movie.releaseDate }
                        onChange={handleChange}
                    />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Rated:</Form.Label>
                    <Form.Control
                        placeholder="G/PG/PG-13/R"
                        name="rating"
                        id="rating"
                        value={ movie.rating }
                        onChange={handleChange}
                    />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Genre:</Form.Label>
                    <Form.Control
                        placeholder="enter genre"
                        name="genre"
                        id="genre"
                        value={ movie.genre }
                        onChange={handleChange}
                    />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Run time:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="mins"
                        name="length"
                        id="length"
                        value={ movie.length }
                        onChange={handleChange}
                    />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Have you watched this movie?"
                        name="watched"
                        defaultChecked={ movie.watched }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MovieForm