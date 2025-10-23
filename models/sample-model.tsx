
export class SampleModel {

    //Fields 
    dimension: Number
    innerRadius: Number
    backgroundClass?: Number  
    backgroundOpacity?: Number
    myPropertyToSet?: String 
    myArray: Array<any> 
    
    constructor (dimension: Number, innerRadius: Number, myArr: Array<Number>){
       this.dimension = dimension
       this.innerRadius = innerRadius
       this.myArray = myArr
    }
}

//import { SampleModel } from '../../models/sample-model;