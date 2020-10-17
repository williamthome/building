import { Route } from '../protocols'

export interface RouteAdapter<U> {
  adaptRoute: <T> (route: Route<T>, webServer: U) => U
}