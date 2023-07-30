import { AKData, AKEventData } from './DataType';
// import { asd, qwe } from './test';

const titleReg = /[一二三四五六七八九十]{1,2}、[^一二三四五六七八九十]+(?=活动时间：)/gm;
const timeReg = /(?<=[一二三四五六七八九十]{1,2}、[^一二三四五六七八九十]+)活动时间：.+?-.+?\d{1,2}:\d{2}/gm;
const specialReg = /\d{1,2}月\d{1,2}日.+?-.+?\d{1,2}:\d{1,2}/;

function stripHtmlTags(html: string) {
	return html.replace(/<[^>]*>/g, '');
}

const getAKPopupEvent = async (eventList: string, eventDetail: string): Promise<any> => {
	const res = await fetch(eventList);
	// const data = ((await res.json()) as AKData).data.popup.defaultPopup;
	// return `${eventDetail}/${data}`;
	const data = ((await res.json()) as AKData).data.list.map((obj) => `${eventDetail}/${obj.cid}`);
	return data;
};

const getAKEventDetail = async (url: string) => {
	const res = await fetch(url);
	const data = ((await res.json()) as { data: AKEventData }).data;
	const text = stripHtmlTags(data.content);
	const title = text.match(titleReg);
	const time = text.match(timeReg);
	if (!title && !time) {
		return [];
	}
	const event = title?.map((title, i) => {
		const [start_time, end_time] = parseStrToTime(time![i]) || [null, null];
		return { id: `${data.cid}${i}`, title, start_time, end_time };
	});
	return event;
};

const parseStrToTime = (str: string) => {
	const [start_time, end_time] = str
		.replace(/活动时间：/, '')
		.split('-')
		.map((s) => s.trim());
	if (!start_time || !end_time) {
		return undefined;
	}
	if (start_time.includes('年')) {
		return [start_time, end_time];
	}
	if (start_time.includes('日') && end_time.includes('日')) {
		const thisYear = new Date().getFullYear().toString() + '年';
		return [thisYear + start_time, thisYear + end_time];
	}
	if (specialReg.test(str)) {
		return [start_time, start_time.match(/.+?日/)![0] + end_time];
	}
	return undefined;
};

const getAKEventWithDetailTime = async (eventList: string, eventDetail: string) => {
	const events = await getAKPopupEvent(eventList, eventDetail);
	const temp = [];
	for (let i = 0; i < events.length; i++) {
		const data = (await getAKEventDetail(events[i])) ?? [];
		data?.length > 0 && temp.push(data);
	}
	return temp.flatMap((item) => item);
};

export { getAKEventWithDetailTime };
