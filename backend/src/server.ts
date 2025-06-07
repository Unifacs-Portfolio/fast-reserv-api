import { setup } from './app'
import { env } from './env'

setup().then((app) => {
	app.listen(env.PORT, (err) => {
		if (err) {
			console.error(err)
		}
		console.log('server running')
	})
})
