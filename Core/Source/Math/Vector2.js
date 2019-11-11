"use strict";
var FudgeCore;
(function (FudgeCore) {
    /**
     * Stores and manipulates a twodimensional vector comprised of the components x and y
     * ```plaintext
     *            +y
     *             |__ +x
     * ```
     * @authors Lukas Scheuerle, HFU, 2019
     */
    class Vector2 extends FudgeCore.Mutable {
        constructor(_x = 0, _y = 0) {
            super();
            this.data = new Float32Array([_x, _y]);
        }
        get x() {
            return this.data[0];
        }
        get y() {
            return this.data[1];
        }
        set x(_x) {
            this.data[0] = _x;
        }
        set y(_y) {
            this.data[1] = _y;
        }
        /**
         * A shorthand for writing `new Vector2(0, 0)`.
         * @returns A new vector with the values (0, 0)
         */
        static get ZERO() {
            let vector = new Vector2();
            return vector;
        }
        /**
         * A shorthand for writing `new Vector2(_scale, _scale)`.
         */
        static ONE(_scale = 1) {
            let vector = new Vector2(_scale, _scale);
            return vector;
        }
        /**
         * A shorthand for writing `new Vector2(0, 1)`.
         * @returns A new vector with the values (0, 1)
         */
        static get UP() {
            let vector = new Vector2(0, 1);
            return vector;
        }
        /**
         * A shorthand for writing `new Vector2(0, -1)`.
         * @returns A new vector with the values (0, -1)
         */
        static get DOWN() {
            let vector = new Vector2(0, -1);
            return vector;
        }
        /**
         * A shorthand for writing `new Vector2(1, 0)`.
         * @returns A new vector with the values (1, 0)
         */
        static get RIGHT() {
            let vector = new Vector2(1, 0);
            return vector;
        }
        /**
         * A shorthand for writing `new Vector2(-1, 0)`.
         * @returns A new vector with the values (-1, 0)
         */
        static get LEFT() {
            let vector = new Vector2(-1, 0);
            return vector;
        }
        /**
         * Normalizes a given vector to the given length without editing the original vector.
         * @param _vector the vector to normalize
         * @param _length the length of the resulting vector. defaults to 1
         * @returns a new vector representing the normalised vector scaled by the given length
         */
        static NORMALIZATION(_vector, _length = 1) {
            let vector = Vector2.ZERO;
            try {
                let [x, y] = _vector.data;
                let factor = _length / Math.hypot(x, y);
                vector.data = new Float32Array([_vector.x * factor, _vector.y * factor]);
            }
            catch (_e) {
                console.warn(_e);
            }
            return vector;
        }
        /**
         * Scales a given vector by a given scale without changing the original vector
         * @param _vector The vector to scale.
         * @param _scale The scale to scale with.
         * @returns A new vector representing the scaled version of the given vector
         */
        static SCALE(_vector, _scale) {
            let vector = new Vector2();
            return vector;
        }
        /**
         * Sums up multiple vectors.
         * @param _vectors A series of vectors to sum up
         * @returns A new vector representing the sum of the given vectors
         */
        static SUM(..._vectors) {
            let result = new Vector2();
            for (let vector of _vectors)
                result.data = new Float32Array([result.x + vector.x, result.y + vector.y]);
            return result;
        }
        /**
         * Subtracts two vectors.
         * @param _a The vector to subtract from.
         * @param _b The vector to subtract.
         * @returns A new vector representing the difference of the given vectors
         */
        static DIFFERENCE(_a, _b) {
            let vector = new Vector2;
            vector.data = new Float32Array([_a.x - _b.x, _a.y - _b.y]);
            return vector;
        }
        /**
         * Computes the dotproduct of 2 vectors.
         * @param _a The vector to multiply.
         * @param _b The vector to multiply by.
         * @returns A new vector representing the dotproduct of the given vectors
         */
        static DOT(_a, _b) {
            let scalarProduct = _a.x * _b.x + _a.y * _b.y;
            return scalarProduct;
        }
        /**
         * Returns the magnitude of a given vector.
         * If you only need to compare magnitudes of different vectors, you can compare squared magnitudes using Vector2.MAGNITUDESQR instead.
         * @see Vector2.MAGNITUDESQR
         * @param _vector The vector to get the magnitude of.
         * @returns A number representing the magnitude of the given vector.
         */
        static MAGNITUDE(_vector) {
            let magnitude = Math.sqrt(Vector2.MAGNITUDESQR(_vector));
            return magnitude;
        }
        /**
         * Returns the squared magnitude of a given vector. Much less calculation intensive than Vector2.MAGNITUDE, should be used instead if possible.
         * @param _vector The vector to get the squared magnitude of.
         * @returns A number representing the squared magnitude of the given vector.
         */
        static MAGNITUDESQR(_vector) {
            let magnitude = Vector2.DOT(_vector, _vector);
            return magnitude;
        }
        /**
         * Calculates the cross product of two Vectors. Due to them being only 2 Dimensional, the result is a single number,
         * which implicitly is on the Z axis. It is also the signed magnitude of the result.
         * @param _a Vector to compute the cross product on
         * @param _b Vector to compute the cross product with
         * @returns A number representing result of the cross product.
         */
        static CROSSPRODUCT(_a, _b) {
            let crossProduct = _a.x * _b.y - _a.y * _b.x;
            return crossProduct;
        }
        /**
         * Calculates the orthogonal vector to the given vector. Rotates counterclockwise by default.
         * ```plaintext
         *    ^                |
         *    |  =>  <--  =>   v  =>  -->
         * ```
         * @param _vector Vector to get the orthogonal equivalent of
         * @param _clockwise Should the rotation be clockwise instead of the default counterclockwise? default: false
         * @returns A Vector that is orthogonal to and has the same magnitude as the given Vector.
         */
        static ORTHOGONAL(_vector, _clockwise = false) {
            if (_clockwise)
                return new Vector2(_vector.y, -_vector.x);
            else
                return new Vector2(-_vector.y, _vector.x);
        }
        /**
         * Adds the given vector to the executing vector, changing the executor.
         * @param _addend The vector to add.
         */
        add(_addend) {
            this.data = new Vector2(_addend.x + this.x, _addend.y + this.y).data;
        }
        /**
         * Subtracts the given vector from the executing vector, changing the executor.
         * @param _subtrahend The vector to subtract.
         */
        subtract(_subtrahend) {
            this.data = new Vector2(this.x - _subtrahend.x, this.y - _subtrahend.y).data;
        }
        /**
         * Scales the Vector by the _scale.
         * @param _scale The scale to multiply the vector with.
         */
        scale(_scale) {
            this.data = new Vector2(_scale * this.x, _scale * this.y).data;
        }
        /**
         * Normalizes the vector.
         * @param _length A modificator to get a different length of normalized vector.
         */
        normalize(_length = 1) {
            this.data = Vector2.NORMALIZATION(this, _length).data;
        }
        /**
         * Sets the Vector to the given parameters. Ommitted parameters default to 0.
         * @param _x new x to set
         * @param _y new y to set
         */
        set(_x = 0, _y = 0) {
            this.data = new Float32Array([_x, _y]);
        }
        /**
         * Checks whether the given Vector is equal to the executed Vector.
         * @param _vector The vector to comapre with.
         * @returns true if the two vectors are equal, otherwise false
         */
        equals(_vector) {
            if (this.data[0] == _vector.data[0] && this.data[1] == _vector.data[1])
                return true;
            return false;
        }
        /**
         * @returns An array of the data of the vector
         */
        get() {
            return new Float32Array(this.data);
        }
        /**
         * @returns A deep copy of the vector.
         */
        get copy() {
            return new Vector2(this.x, this.y);
        }
        /**
         * Adds a z-component to the vector and returns a new Vector3
         */
        toVector3() {
            return new FudgeCore.Vector3(this.x, this.y, 0);
        }
        getMutator() {
            let mutator = {
                x: this.data[0], y: this.data[1]
            };
            return mutator;
        }
        reduceMutator(_mutator) { }
    }
    FudgeCore.Vector2 = Vector2;
})(FudgeCore || (FudgeCore = {}));
//# sourceMappingURL=Vector2.js.map