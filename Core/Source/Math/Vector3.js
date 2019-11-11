"use strict";
var FudgeCore;
(function (FudgeCore) {
    /**
     * Stores and manipulates a threedimensional vector comprised of the components x, y and z
     * ```plaintext
     *            +y
     *             |__ +x
     *            /
     *          +z
     * ```
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    class Vector3 extends FudgeCore.Mutable {
        constructor(_x = 0, _y = 0, _z = 0) {
            super();
            this.data = new Float32Array([_x, _y, _z]);
        }
        // TODO: implement equals-functions
        get x() {
            return this.data[0];
        }
        get y() {
            return this.data[1];
        }
        get z() {
            return this.data[2];
        }
        set x(_x) {
            this.data[0] = _x;
        }
        set y(_y) {
            this.data[1] = _y;
        }
        set z(_z) {
            this.data[2] = _z;
        }
        static X(_scale = 1) {
            const vector = new Vector3(_scale, 0, 0);
            return vector;
        }
        static Y(_scale = 1) {
            const vector = new Vector3(0, _scale, 0);
            return vector;
        }
        static Z(_scale = 1) {
            const vector = new Vector3(0, 0, _scale);
            return vector;
        }
        static ZERO() {
            const vector = new Vector3(0, 0, 0);
            return vector;
        }
        static ONE(_scale = 1) {
            const vector = new Vector3(_scale, _scale, _scale);
            return vector;
        }
        static TRANSFORMATION(_vector, _matrix, _includeTranslation = true) {
            let result = new Vector3();
            let m = _matrix.get();
            let [x, y, z] = _vector.get();
            result.x = m[0] * x + m[4] * y + m[8] * z;
            result.y = m[1] * x + m[5] * y + m[9] * z;
            result.z = m[2] * x + m[6] * y + m[10] * z;
            if (_includeTranslation) {
                result.add(_matrix.translation);
            }
            return result;
        }
        static NORMALIZATION(_vector, _length = 1) {
            let vector = Vector3.ZERO();
            try {
                let [x, y, z] = _vector.data;
                let factor = _length / Math.hypot(x, y, z);
                vector.data = new Float32Array([_vector.x * factor, _vector.y * factor, _vector.z * factor]);
            }
            catch (_e) {
                FudgeCore.Debug.warn(_e);
            }
            return vector;
        }
        /**
         * Sums up multiple vectors.
         * @param _vectors A series of vectors to sum up
         * @returns A new vector representing the sum of the given vectors
         */
        static SUM(..._vectors) {
            let result = new Vector3();
            for (let vector of _vectors)
                result.data = new Float32Array([result.x + vector.x, result.y + vector.y, result.z + vector.z]);
            return result;
        }
        /**
         * Subtracts two vectors.
         * @param _a The vector to subtract from.
         * @param _b The vector to subtract.
         * @returns A new vector representing the difference of the given vectors
         */
        static DIFFERENCE(_a, _b) {
            let vector = new Vector3;
            vector.data = new Float32Array([_a.x - _b.x, _a.y - _b.y, _a.z - _b.z]);
            return vector;
        }
        /**
         * Returns a new vector representing the given vector scaled by the given scaling factor
         */
        static SCALE(_vector, _scaling) {
            let scaled = new Vector3();
            scaled.data = new Float32Array([_vector.x * _scaling, _vector.y * _scaling, _vector.z * _scaling]);
            return scaled;
        }
        /**
         * Computes the crossproduct of 2 vectors.
         * @param _a The vector to multiply.
         * @param _b The vector to multiply by.
         * @returns A new vector representing the crossproduct of the given vectors
         */
        static CROSS(_a, _b) {
            let vector = new Vector3;
            vector.data = new Float32Array([
                _a.y * _b.z - _a.z * _b.y,
                _a.z * _b.x - _a.x * _b.z,
                _a.x * _b.y - _a.y * _b.x
            ]);
            return vector;
        }
        /**
         * Computes the dotproduct of 2 vectors.
         * @param _a The vector to multiply.
         * @param _b The vector to multiply by.
         * @returns A new vector representing the dotproduct of the given vectors
         */
        static DOT(_a, _b) {
            let scalarProduct = _a.x * _b.x + _a.y * _b.y + _a.z * _b.z;
            return scalarProduct;
        }
        /**
         * Calculates and returns the reflection of the incoming vector at the given normal vector. The length of normal should be 1.
         *     __________________
         *           /|\
         * incoming / | \ reflection
         *         /  |  \
         *          normal
         *
         */
        static REFLECTION(_incoming, _normal) {
            let dot = -Vector3.DOT(_incoming, _normal);
            let reflection = Vector3.SUM(_incoming, Vector3.SCALE(_normal, 2 * dot));
            return reflection;
        }
        add(_addend) {
            this.data = new Vector3(_addend.x + this.x, _addend.y + this.y, _addend.z + this.z).data;
        }
        subtract(_subtrahend) {
            this.data = new Vector3(this.x - _subtrahend.x, this.y - _subtrahend.y, this.z - _subtrahend.z).data;
        }
        scale(_scale) {
            this.data = new Vector3(_scale * this.x, _scale * this.y, _scale * this.z).data;
        }
        normalize(_length = 1) {
            this.data = Vector3.NORMALIZATION(this, _length).data;
        }
        set(_x = 0, _y = 0, _z = 0) {
            this.data = new Float32Array([_x, _y, _z]);
        }
        get() {
            return new Float32Array(this.data);
        }
        get copy() {
            return new Vector3(this.x, this.y, this.z);
        }
        transform(_matrix, _includeTranslation = true) {
            this.data = Vector3.TRANSFORMATION(this, _matrix, _includeTranslation).data;
        }
        /**
         * Drops the z-component and returns a Vector2 consisting of the x- and y-components
         */
        toVector2() {
            return new FudgeCore.Vector2(this.x, this.y);
        }
        reflect(_normal) {
            const reflected = Vector3.REFLECTION(this, _normal);
            this.set(reflected.x, reflected.y, reflected.z);
            FudgeCore.Recycler.store(reflected);
        }
        getMutator() {
            let mutator = {
                x: this.data[0], y: this.data[1], z: this.data[2]
            };
            return mutator;
        }
        reduceMutator(_mutator) { }
    }
    FudgeCore.Vector3 = Vector3;
})(FudgeCore || (FudgeCore = {}));
//# sourceMappingURL=Vector3.js.map