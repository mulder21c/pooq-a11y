# 2020 IAT (정보 접근성) 컨퍼런스 발표 예제 컴포넌트 별 구현 사례

## Live Demo

[Live Sample](https://pooq-a11y.netlify.app)

[Storybook](https://mulder21c-pooq.netlify.app)

## in Progress

- [x] 컴포넌트 별 구현 사례 초기 버전 적용 및 문서화(Storybook) 
- [ ] `@nuxtjs/dayjs` 등 오류 상황 storybook 질의 및 해결
- [ ] 각 Docs 내 rendered code 삽입 및 사용된 접근성 설명 추가
- [ ] 향후 AOA11Y 채널에 영상 제작(?)


## issues

아래 항목들 storybook 질의 필요

### Storybook `@nuxtjs/dayjs` 오류 발생 중

- `molecules/ContentCard`에 Canvas로 접근 가능, Docs 접근 시 오류 발생
- `organisms/ContentBand/Vod Type`에 접근 시 오류 발생
- `template/MainPAge`에 접근 시 오류 발생

### Storybook `vue-fragment` 오류 발생
- `template/MainPAge`에 접근 시 오류 발생
