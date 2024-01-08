export interface IpoData {
    id: number; // 시퀀스
    ipo_name: string; // 공모주 이름
    ipo_date: Date; // 공모주 기간
    ipo_date_from: Date; // 공모주 시작날짜
    ipo_date_to: Date; // 공모주 종료날짜
    public_offering_price: number; // 희망공모가
    competition_rate: string; // 청약경쟁률
    under_writer: string; // 주간사
}

