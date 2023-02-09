import Container from "react-bootstrap/Container"
import MoviesIndex from "./movies/MoviesIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
        <Container className="m-2" style={{textAlign: 'center'}}>
            <h2>See All The Movies</h2>
            <MoviesIndex msgAlert={ props.msgAlert }/>
        </Container>
	)
}

export default Home
