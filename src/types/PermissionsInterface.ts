/* eslint-disable @typescript-eslint/no-unused-vars */
interface SliderHeader {
    title: string;
}

interface SliderBody {
    title: string;
    image: string;
}

interface SliderFooter {
    btnText: string;
}

interface SliderItem {
    id: number;
    header: SliderHeader;
    body: SliderBody;
    footer: SliderFooter;
}
