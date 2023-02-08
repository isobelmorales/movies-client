import MoviesIndex from "./movies/MoviesIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>See All The Movies</h2>
            <MoviesIndex msgAlert={ props.msgAlert }/>
		</>
	)
}

export default Home
