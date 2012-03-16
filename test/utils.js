void function() {
	window.LE = true 		   // Cheating
	window.accuracy = 'OpenCL' // Cheating
	
	var buffer = new ArrayBuffer(8)
	
	var floats = new Float64Array(buffer)
	var bytes = new Uint8Array(buffer)
	
	window.assertULP = function(f) {
		var input = Array.prototype.slice.call(arguments, 9, arguments.length - 1)
		var expected = Array.prototype.slice.call(arguments, arguments.length - 1)
		
		floats[0] = f.apply(this, input)
		
		correct = Array.prototype.slice.call(arguments, 1, 9)
		
		if (LE) { correct = correct.reverse() }
		
		var diff0 = (bytes[0] - correct[0])
		var diff1 = (bytes[1] - correct[1])
		var diff2 = (bytes[2] - correct[2])
		var diff3 = (bytes[3] - correct[3])
		var diff4 = (bytes[4] - correct[4])
		var diff5 = (bytes[5] - correct[5])
		var diff6 = (bytes[6] - correct[6])
		var diff7 = (bytes[7] - correct[7])
		
		var diff = 0
		
		diff += diff0 * 0x0000000000000001
		diff += diff1 * 0x0000000000000100
		diff += diff2 * 0x0000000000010000
		diff += diff3 * 0x0000000001000000
		diff += diff4 * 0x0000000100000000
		diff += diff5 * 0x0000010000000000
		diff += diff6 * 0x0001000000000000
		diff += diff7 * 0x0100000000000000
		
		diff = Math.abs(diff)
		
		if (diff >= window.ulp) {
			console.log(diff, diff0, diff1, diff2, diff3, diff4, diff5, diff6, diff7)
		}
		
		assert("Error in ULP should be less than " + window.ulp + " but is " + diff + " for f(" + input + ") = " + floats[0] + ", expected " + expected + ".", diff < window.ulp)
	}
}()