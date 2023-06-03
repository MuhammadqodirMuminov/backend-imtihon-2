import postgres from '../utils/postgres.js';

const AllEvents = async () => {
	try {
		const events = await postgres.fetchData(`SELECT * FROM events WHERE status = 'accepted'`);
		return events;
	} catch (error) {
		console.log(error);
	}
};

const CreateEvent = async (
	{
		event_date,
		event_time,
		category,
		subcategory,
		event_activity,
		link,
		author,
		author_job,
		author_phone,
		event_name,
		event_description,
	},
	eventImage
) => {
	try {
		const event = await postgres.fetchData(
			'INSERT INTO events(event_name, event_description, event_time, event_date , image, event_activity, event_link, author, author_job, author_phone, category, subcategory) VALUES($1,$2,$3, $4, $5, $6, $7, $8, $9,$10,$11,$12) RETURNING *',
			[
				event_name,
				event_description,
				event_time,
				event_date,
				eventImage,
				event_activity,
				link,
				author,
				author_job,
				author_phone,
				category,
				subcategory,
			]
		);

		return event;
	} catch (error) {
		console.log(error);
	}
};

const writeView = async (id, userAgent, ip) => {
	try {
		const existViewer = await postgres.fetchData(
			`SELECT * FROM viewpage WHERE ip = $1 AND userAgent = $2 AND id = $3`,
			[ip, userAgent, id]
		);


		if (existViewer.length == 0) {
			const inserted = await postgres.fetchData(
				`INSERT INTO viewpage(id, userAgent, ip) VALUES($1,$2,$3) RETURNING *;`,
				[id, userAgent, ip]
			);
			return inserted;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};

const findById = async id => {
	try {
		const getById = await postgres.fetchData(
			`SELECT * FROM events WHERE event_id = $1 AND status = 'accepted' `,
			[id]
		);
		return getById;
	} catch (error) {
		console.log(error);
	}
};

const updateById = async id => {
	try {
		const data = await postgres.fetchData(
			`UPDATE events SET view_count = view_count + 1 WHERE event_id = $1 RETURNING *`,
			[id]
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { AllEvents, CreateEvent, writeView, findById, updateById };
