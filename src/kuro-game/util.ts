import { KuroWikiGameData } from './DataType';

// wuthering-waves
const MC_TARGET_TITLE = '版本活动';
const MC_Wiki_type = '9';
const PNS_TARGET_TITLE = '热门活动';
const PNS_Wiki_type = '2';

export const getWutheringWavesEvent = async (url: string) => {
	const res = (await (
		await fetch(url, {
			method: 'POST',
			headers: {
				Wiki_type: MC_Wiki_type,
			},
		})
	).json()) as KuroWikiGameData;
	const target = res.data.contentJson.sideModules.find(({ title }) => title === MC_TARGET_TITLE);
	if (!target) {
		return [];
	}
	return target?.content
		.filter(({ countDown }) => !!countDown)
		.map((item) => {
			const {
				countDown,
				title,
				linkConfig: { entryId },
				contentUrl: banner,
			} = item;
			const [start_time, end_time] = countDown!.dateRange;
			return { id: entryId, title, start_time, end_time, banner };
		});
};

// 战双帕弥什
export const getPunishingEvent = async (url: string) => {
	const res = (await (
		await fetch(url, {
			method: 'POST',
			headers: {
				Wiki_type: PNS_Wiki_type,
			},
		})
	).json()) as KuroWikiGameData;
	const target = res.data.contentJson.sideModules.find(({ title }) => title === PNS_TARGET_TITLE);
	if (!target) {
		return [];
	}
	return target?.content
		.filter(({ countDown }) => !!countDown)
		.map((item, i) => {
			const {
				countDown,
				title,
				linkConfig: { entryId },
				contentUrl: banner,
			} = item;
			const [start_time, end_time] = countDown!.dateRange;
			return { id: entryId ?? i, title, start_time, end_time, banner };
		});
};
