import { RouteObject } from "react-router";
import HomePage from './pages/index';
import AboutPage from './pages/about';
import PlacesPage from './pages/places';
import CulturePage from './pages/culture';
import FoodPage from './pages/food';
import RoadmapPage from './pages/roadmap';
import ContactPage from './pages/contact';
import ProdNotFoundPage from './pages/_404';
export const routes: RouteObject[] = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/places',
  element: <PlacesPage />
}, {
  path: '/culture',
  element: <CulturePage />
}, {
  path: '/food',
  element: <FoodPage />
}, {
  path: '/roadmap',
  element: <RoadmapPage />
}, {
  path: '/contact',
  element: <ContactPage />
}, {
  path: '*',
  element: <ProdNotFoundPage />
}];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/places' | '/culture' | '/food' | '/roadmap' | '/contact';
export type Params = Record<string, string | undefined>;
