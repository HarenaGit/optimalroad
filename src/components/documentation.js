import React from 'react'
import {Slide} from 'material-auto-rotating-carousel'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import {Color} from '../canvas_components/utilities/color'
import createPoint from '../images/documentation/create_point.gif'
import deletePoint from '../images/documentation/delete point.gif'
import createLine from '../images/documentation/create_line.gif'
import modifieLine from '../images/documentation/modifi_line_value.gif'
import deleteLine from '../images/documentation/delete_line.gif'
import dragSommet from '../images/documentation/drag_point.gif'
import selectLine from '../images/documentation/select_delet_line.gif'
import algoType from '../images/documentation/algo_choice_launch.gif'
import computeDetail from '../images/documentation/detail_compute.gif'
import reset from '../images/documentation/resetr.gif'
export default function Documentation(props){
  return(
    <div >
    
    <AutoRotatingCarousel
      label='OK'
      open={props.open}
      onClose={() => {props.close()}}
      onStart={() => {props.close()}}
      style={{ position: 'absolute' }}
      interval = {15000}
    >
      <Slide
        media={<img src={createPoint} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title='Création de sommet'
        subtitle="Selectionner l'outil 'Sommet' et cliquer sur l'espace de travail. Le sommet ayant le plus grand index sera le sommet d'arriver et le plus petit sera le départ du chemin."
      />
      <Slide
        media={<img src={deletePoint} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title='Suppression de sommet'
        subtitle="A droite, cliquer sur l'icon de suppression sur l'index du sommet à supprimer." 
      />
      <Slide
        media={<img src={createLine} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Création d'un arc"
        subtitle="Séléctionner l'outil 'Ligne', cliquer en maintenant la souris sur un sommet et la glisser jusqu'à un autre sommet."
      />
      <Slide
        media={<img src={modifieLine} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Modification de la valeur d'un arc"
        subtitle="Séléctionner l'outil 'Ligne' et à droite modifier sa valeur."
      />
       <Slide
        media={<img src={deleteLine} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Suppression d'un arc"
        subtitle="Séléctionner l'outil 'Ligne' et cliquer sur l'icon de suppression sur l'arc concerner."
      />
       <Slide
        media={<img src={dragSommet} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Déplacement d'un sommet"
        subtitle="Séléctionner l'outil 'Séléction' et cliquer en maintenant la souris pour déplacer."
      />
      <Slide
        media={<img src={selectLine} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Séléction d'un arc "
        subtitle="Séléctionner l'outil 'Séléction' et cliquer sur l'arc en question."
      />
       <Slide
        media={<img src={algoType} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Séléction d'un algorithme et lancer la recherche "
        subtitle="Séléctionner un algorithme en bas à gauche avec le type de chemin rechercher et cliquer sur le boutton 'LANCER'."
      />
      <Slide
        media={<img src={computeDetail} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Détails des calculs "
        subtitle="Visibles en cliquant sur le bouton à gauche du boutton LANCER."
      />
       <Slide
        media={<img src={reset} />}
        mediaBackgroundStyle={{ backgroundColor: Color.blackColor }}
        style={{ backgroundColor: Color.backgroundColor }}
        title="Réinitialisation"
        subtitle="Cliquer sur le boutton 'Suppression' à gauche."
      />
    </AutoRotatingCarousel>
  </div>
  );
}