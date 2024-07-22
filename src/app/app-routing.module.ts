import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map1',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'map1',
    loadChildren: () => import('./pages/map1/map1.module').then( m => m.Map1PageModule)
  },
  {
    path: 'maklumbalas',
    loadChildren: () => import('./pages/maklumbalas/maklumbalas.module').then( m => m.MaklumbalasPageModule)
  },
  {
    path: 'map2',
    loadChildren: () => import('./pages/map2/map2.module').then( m => m.Map2PageModule)
  },
  {
    path: 'outbreak',
    loadChildren: () => import('./pages/outbreak/outbreak.module').then( m => m.OutbreakPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
