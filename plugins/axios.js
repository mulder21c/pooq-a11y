import api from '@/apis';

export default ({ $axios, app, store, env }, inject) => {
  const {
    APIKEY: apikey,
    DEVICETYPE: device,
    PARTNER: partner,
    REGION: region,
  } = env;

  const { credential, pooqzone } = store.state.common.userInfo;

  inject(
    'api',
    api($axios, { apikey, device, partner, region, credential, pooqzone }),
  );
};
