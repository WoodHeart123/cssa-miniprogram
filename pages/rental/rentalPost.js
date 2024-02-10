const floorPlan = [{
		text: "Studio",
		value: "Studio",
	},
	{
		text: "1B",
		value: "1B0B",
		children: [{
			text: "1B",
			value: "1B1B"
		}]
	},
	{
		text: "2B",
		value: "2B0B",
		children: [{
			text: "1B",
			value: "2B1B"
		}, {
			text: "2B",
			value: "2B2B"
		}]
	},{
		text: "3B",
		value: "3B0B",
		children: [{
			text: "1B",
			value: "3B1B"
		}, {
			text: "2B",
			value: "3B2B"
		}, {
			text: "3B",
			value: "3B3B"
		}]
	},{
		text: "4B",
		value: "4B0B",
		children: [{
			text: "1B",
			value: "4B1B"
		}, {
			text: "2B",
			value: "4B2B"
		}, {
			text: "3B",
			value: "4B3B"
		}, {
			text: "4B",
			value: "4B4B"
		}]
	},{
		text: "Other",
		value: "Other",
	}
];
export default floorPlan;
