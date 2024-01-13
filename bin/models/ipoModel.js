"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CREATE TABLE ipoSchedule (
    id SERIAL PRIMARY KEY,
    ipo_name VARCHAR(255) NOT NULL, -- 공모주 이름 (예시: 최대 255자)
    ipo_date DATE NOT NULL, -- 공모주 기간
    ipo_date_from DATE NOT NULL, -- 공모주 시작날짜
    ipo_date_to DATE NOT NULL, -- 공모주 종료날짜
    public_offering_price NUMERIC NOT NULL, -- 희망공모가
    competition_rate VARCHAR(50) NOT NULL, -- 청약경쟁률 (예시: 최대 50자)
    under_writer VARCHAR(255) NOT NULL -- 주간사 (예시: 최대 255자)
);
 */ 
