import { FGOData } from './fgo/DataType';

const getFGOEventList = async (eventsUrl: string): Promise<string[]> => {
	const res = await fetch(eventsUrl);
	const data = ((await res.json()) as { data: FGOData[] }).data
		.filter((obj: FGOData) => obj.title.indexOf('维护公告') === -1 && obj.title.indexOf('概率公示') === -1)
		.map((obj: FGOData) => `https://api.biligame.com/news/${obj.id}.action`);
	return data;
};

const getFGOEventDetail = async (url: string) => {
	const res = await fetch(url);
	const data = ((await res.json()) as { data: FGOData }).data;
	const temp = data.content.match(/[0-9]{4}年[0-9]{1,2}月[0-9]{1,2}日.{1,}为止/gm);
	let start_time;
	let end_time;
	if (!temp) {
		return { ...data, content: temp, start_time, end_time };
	}
	const matchArr = temp[0].match(/[0-9]{4}年[0-9]{1,2}月[0-9]{1,2}日/gm);
	start_time = matchArr && matchArr[0];
	if (matchArr && matchArr?.length > 1) {
		end_time = matchArr[1];
	}
	end_time = start_time?.slice(0, 5) + temp[0].match(/[0-9]{1,2}月[0-9]{1,2}日/gm)![1];
	return { ...data, content: temp, start_time, end_time };
};

const getFGOEventWithDetailTime = async (eventsUrl: string) => {
	const events = await getFGOEventList(eventsUrl);
	const temp = [];
	for (let i = 0; i < events.length; i++) {
		const data = await getFGOEventDetail(events[i]);
		temp.push(data);
	}
	return temp;
};

export { getFGOEventWithDetailTime };
