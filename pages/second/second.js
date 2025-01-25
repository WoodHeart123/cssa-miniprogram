const itemTypes = [
    {
        text: '电子产品',
        value: 'ELECTRONIC',
    },
    {
        text: '交通工具',
        value: 'TRANSPORT',
    },
    {
        text: '家具家电',
        value: 'FURNITURE',
    },
    {
        text: '虚拟卡券',
        value: 'DIGITAL',
    },
    {
        text: '日常用品',
        value: 'DAILY',
    },
    {
        text: '美妆服饰',
        value: 'MAKEUP',
    },
    {
        text: '书籍教具',
        value: 'EDU',
    },
    {
        text: '宠物用品',
        value: 'PET',
    },
    {
        text: '其他',
        value: 'OTHERS',
    },
];
const deliveryOptions = [
    {
        label: '可送货',
        text: '可送货',
        value: 'deliver',
    },
    {
        label: '仅自取',
        text: '自取',
        value: 'pickup',
    },
];
const conditionOptions = [
    {
        label: '全新',
        text: '全新',
        value: 'NEW',
    },
    {
        label: '几乎全新',
        text: '几乎全新',
        value: 'ALMOST_NEW',
    },
    {
        label: '明显使用痕迹',
        text: '明显使用痕迹',
        value: 'USED',
    },
    {
        label: '部分损毁',
        text: '部分损毁',
        value: 'IMPAIRED',
    },
];

export { itemTypes, conditionOptions, deliveryOptions };

export default function getOptions() {
    return 1;
}
