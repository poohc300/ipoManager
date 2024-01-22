export interface IpoData {
    id: number; // 시퀀스
    ipo_name: string; // 공모주 이름
    ipo_date: Date; // 공모주 기간
    ipo_date_from: Date; // 공모주 시작날짜
    ipo_date_to: Date; // 공모주 종료날짜
    confirmed_public_offering_price: number; // 확정공모가
    public_offering_price: number; // 희망공모가
    competition_rate: string; // 청약경쟁률
    under_writer: string; // 주간사
}

/**
 * CREATE TABLE ipoSchedule (
    id SERIAL PRIMARY KEY,
    ipo_name VARCHAR(255) NOT NULL, -- 공모주 이름 (예시: 최대 255자)
    ipo_date DATE NOT NULL, -- 공모주 기간
    ipo_date_from DATE NOT NULL, -- 공모주 시작날짜
    ipo_date_to DATE NOT NULL, -- 공모주 종료날짜
    confirmed_public_offering_price NUMERIC, -- 확정공모가
    public_offering_price NUMERIC NOT NULL, -- 희망공모가
    competition_rate VARCHAR(50) NOT NULL, -- 청약경쟁률 (예시: 최대 50자)
    under_writer VARCHAR(255) NOT NULL -- 주간사 (예시: 최대 255자)
);
 */

export interface WebsiteInfo {
    baseUrl: string, // 기본 주소
    element: string, // html 태그
    pageNumber: number, // 페이지 번호
}