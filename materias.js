import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actionsMateria from '../../../Actions/MateriasActions'
import * as actions from '../../../Actions/ClasesActions'
import * as Constants from '../../../Constants/Constants'

import EmptyBox from './EmptyBox'
import ClaseBox from './ClaseBox'
import { ClaseBoxEstudiante } from './ClaseBoxEstudiante';
import * as HelperFunctions from '../../../Helpers/Functions';
import { LoadingMessage } from '../../../Helpers/LoadingMessage';
import * as Messages from  '../../../Helpers/Messages'
import { MateriaInfo } from './MateriaInfo';
import * as roles from '../../../Constants/Roles'
import * as elems from '../../../AFakeData/myfakedata'

//import FadeIn from 'react-fade-in';

//import { TestCarousel } from './TestCarousel'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { EstudiantesList } from './EstudiantesList';


export const MateriaDetail = (materia) => {
    
    const parameters    = useParams();
    const dispatch      = useDispatch();
    const materiaID     = parameters.id;
    //const materiaID     = props.location.linkProps.materia.id; // from Link
    const role = localStorage.getItem(Constants.TOKEN_SESSION_ROLE)

    useEffect(() => {
        //Load Info Materia
        const loadMateria = () => dispatch(actionsMateria.getMateriaByIDAction(materiaID))
        loadMateria()

        //Load Clases from Materia

        const loadClases = () => dispatch(actions.getClasesByMateriaAction(materiaID))
        loadClases()

    }, [])

   

    //const materiaObj    = useSelector (state => state.materiaReducer.materia)
    const materiaArray  = useSelector (state => state.materiaReducer.materia) //Object.values(materiaObj) //
    const clasesListArray    = useSelector( state => state.claseReducer.clases)
    const [clasesArray, setClasesArray] = useState([])

    useEffect(() => {
        if(clasesListArray.length > 0){
           
            console.log(clasesListArray)
        }
        
        addEmptyBoxes()
        
    }, [clasesListArray])
    
    console.log(clasesListArray)

    const error = useSelector (state => state.claseReducer.error)
    const loading = useSelector (state => state.claseReducer.isProcessing )


    //Add empty boxes
    const addEmptyBoxes = () => {
        
        const numOfWeeks = 17
        const numOfIter = numOfWeeks - clasesListArray.length
        const clases = clasesListArray
        const emptyObj = {status:"vacio"}

        for(let i = 0; i < numOfIter; i++){
            clases.push(emptyObj)
        }
        setClasesArray(clases)
    }

    
    //Change Box according to Role
    function ContentByRole(role, clase, materia, index) {
        switch(role) {
            case roles.profesor_role:
                return (
                    clase.id ? (
                        <ClaseBox 
                            key={index} 
                            clase={clase} 
                            parent={materia}
                        />
                    ) : (
                        <EmptyBox parent={materia} place={index + 1} />
                    )
                )

            default:
                return (
                    clase ? (
                        <ClaseBoxEstudiante 
                            key={index} 
                            clase={clase} 
                            parent={materia}
                        />
                        ) : (
                        <EmptyBox key={index} parent={materia} />
                        ))
        }
    }
    //For Carousel
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,  min: 1024
            },
            items: 4, partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: {
                max: 1024, min: 464
            },
            items: 3, partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {
                max: 464,  min: 0
                },
            items: 1, partialVisibilityGutter: 30
        },
    }


    return (
        <div className="materia">
            { materiaArray.map( (materia, index) => (
                <div key={materia.id} className={`${HelperFunctions.slugify(materia.especialidad)}`}>
                    <div className="container text-left">                        
                        
                            <MateriaInfo 
                                materia={materia}
                            />
                        
                    </div>

                    
                    <div className="container-fluid clases-row">
                        <div className="">                        
                        { error ? <p className="alert alert-danger">{Messages.CONTENIDO_ERROR}</p> : null}
                        { loading ? <LoadingMessage /> : null }
                        {/* antes era clasesListArray */}
                        {clasesListArray.length === 0 
                             ? 
                                <div>
                                    { /*Si clases es igual a  0, mostrar mensaje de instrucciones*/ }
                                    {Messages.CLASES_LIST__EMPTY}
                                    
                                </div>
                             : 
                                /* //Si es diferente a 0,listar clases, listar Clases*/
                                (
                                    
                                <Carousel 
                                    ssr={false}
                                    arrows
                                    autoPlaySpeed={3000}
                                    className=""
                                    containerClass="container-with-dots"
                                    draggable
                                    focusOnSelect={false}
                                    infinite={false}
                                    itemClass="col-sm-3"
                                    keyBoardControl
                                    minimumTouchDrag={80}
                                    renderDotsOutside={false}
                                    responsive={responsive}
                                    showDots={false}
                                    sliderClass=""
                                    slidesToSlide={2}
                                    swipeable
                                >
                                    { clasesArray.map( (clase, index) => ContentByRole(role, clase, materia, index))}
                                </Carousel>
                                )
                            } 
                            
                        </div>
                    </div>
                    {role === roles.profesor_role ? (
                    <div className="container-fluid m">
                        < EstudiantesList clases={clasesListArray} materiaID={materia.id} />
                    </div>
                    ): null}
                                     
                </div>
            
            ))}
            
        </div>
    )
}
