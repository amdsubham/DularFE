// import Config from 'react-native-config';
import {endPoints, EndPoints} from './end-points';
import {ajax, AjaxError} from 'rxjs/ajax';
import {catchError, iif, of, switchMap, throwError} from 'rxjs';
import {ApplicationStore} from '../../core/redux/store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let applicationStore: ApplicationStore | undefined;

type RequestMethod = 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'DELETE' | 'PATCH';
type RequestBody = unknown;
type RequestParams = {[key: string]: string};

interface RequestHeader<TBody> {
  method?: RequestMethod;
  body: TBody;
  params: RequestParams;
  headers: Headers;
}

const DEFAULT_HEADERS = {
  accept: 'application/json',
};

export const injectStrore = (_store?: ApplicationStore) => {
  applicationStore = _store;
};

export const request = <TBody extends RequestBody>(
  endPoint: EndPoints,
  requestHeader?: RequestHeader<TBody>,
) => {
  // const url = `${Config.API_URL}${endPoints[endPoint]}`;
  const url = `${endPoints[endPoint]}`;
  return requestWithToken(url, requestHeader);
};

export const requestWithToken = <TBody extends RequestBody>(
  url: string,
  requestHeader?: RequestHeader<TBody>,
) => {
  const {method = 'GET', body, headers} = requestHeader ?? {};
  return ajax({
    url: url,
    method,
    body,
    headers: {
      ...headers,
      ...DEFAULT_HEADERS,
    },
  }).pipe(
    switchMap(({response}: any) => {
      const {data} = response;
      return iif(() => !!data, of(data), throwError("something won't wrong"));
    }),
    catchError(({response}: AjaxError) => throwError(response)),
  );
};
