import postgres from '../utils/postgres.js';

const get_admin = async () => {
	try {
		const admin = await postgres.fetchData('SELECT * FROM admin;');
		return admin;
	} catch (error) {
		console.log(error);
	}
};

const getPendingEvents = async () => {
	try {
		const pending = await postgres.fetchData(`SELECT * FROM events WHERE status = 'pending';`);

		return pending;
	} catch (error) {
		console.log(error);
	}
};

const addToAccepted = async ({ id }) => {
	try {
		const updatedEvent = await postgres.fetchData(
			`
		UPDATE events SET status = 'accepted' WHERE event_id = $1 AND status = 'pending' RETURNING *;`,
			[id]
		);

		return updatedEvent;
	} catch (error) {
		console.log(error);
	}
};

const addToIgnored = async ({ id }) => {
	try {
		const updatedEvent = await postgres.fetchData(
			`
		UPDATE events SET status = 'ignored' WHERE event_id = $1 AND status = 'pending' RETURNING *;`,
			[id]
		);

		return updatedEvent;
	} catch (error) {
		console.log(error);
	}
};

const getAccepted = async () => {
	try {
		const accepted = await postgres.fetchData(`SELECT * FROM events WHERE status = 'accepted';`);

		return accepted;
	} catch (error) {
		console.log(error);
	}
};

const getIgnored = async () => {
	try {
		const ignored = await postgres.fetchData(`SELECT * FROM events WHERE status = 'ignored';`);

		return ignored;
	} catch (error) {
		console.log(error);
	}
};

export { get_admin, getPendingEvents, addToAccepted, addToIgnored, getAccepted, getIgnored };
