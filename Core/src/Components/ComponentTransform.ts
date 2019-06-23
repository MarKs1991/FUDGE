namespace Fudge {
    /**
     * The transformation-data of the node, extends ComponentPivot for fewer redundancies.
     * Affects the origin of a node and its descendants. Use [[ComponentPivot]] to transform only the mesh attached
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class ComponentTransform extends Component {
        public matrix: Matrix4x4;

        public constructor() {
            super();
            this.matrix = Matrix4x4.IDENTITY;
        }

        public get WorldPosition(): Vector3 {
            return new Vector3(this.matrix.data[12], this.matrix.data[13], this.matrix.data[14]);
        }

        public serialize(): Serialization {
            let serialization: Serialization = {
                // worldMatrix: this.worldMatrix.serialize(),  // is transient, doesn't need to be serialized...     
                [super.type]: super.serialize()
            };
            return serialization;
        }
        public deserialize(_serialization: Serialization): Serializable {
            // this.worldMatrix.deserialize(_serialization.worldMatrix);
            super.deserialize(_serialization[super.type]);
            return this;
        }

        public mutate(_mutator: Mutator): void {
            super.mutate(_mutator);
        }
        protected reduceMutator(_mutator: Mutator): void {
            delete _mutator.world;
            super.reduceMutator(_mutator);
        }
    }
}
