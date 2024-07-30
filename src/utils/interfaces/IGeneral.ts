export interface IOptionMap {
  place: string,
  zoom: number,
  lat: number,
  lng: number,
}

export interface ILocation {
  lat: number,
  lng: number,
  altitude?: number |null,
  accuracy?: number,
  heading?: number |null,
  speed?: number |null,
  success:boolean
}

export interface INavigation {
  navigation: any,
  route:any,
}

export interface INavigationMenu {
  navigation: any,
  url?:string,
  icon?:string,
}

export interface INavigationGo {
  navigation: any,
  url:string,
  icon:string,
}

export interface INavigationBack {
  navigation: any,
  icon:string,
}

export interface MessageResponse {
  success: boolean,
  message: string,
  code: number,
  data?:any,
  total?:number,
  suma?:number
}

export interface ResponseFetch {
  headers: {
    map:{
      authorization:string
    }
  }
}

export interface IMapConfig {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}