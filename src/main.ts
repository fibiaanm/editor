import {Moveable} from "./schema/actions.schema.ts";
import {position} from "./schema/frame.schema.ts";
import {ElementEntity} from "./engine/element.entity.ts";
import {ApplicationInstance} from "./engine/application.instance.ts";

ApplicationInstance.getInstance(document.getElementById('wrapper') as HTMLDivElement)

//const el = new Move(document.getElementById('image'))
const image = new ElementEntity(document.getElementById('image'))
    .selectable()
    .movable()
    .resizable()
