require 'mpfr'

bcf, jsf, n = ARGV

n = n.to_i
prng = Random.new(9001)

MPFR.set_default_prec(128)

class Random
  def float
    [self.rand(2 ** 64)].pack('Q').unpack('D')[0]
  end
end

class Float
  def to_byte_representation
    return [self].pack('G').unpack('CCCCCCCC')
  end
end

def generate_test(bcf, jsf, *input)
  values = input.map { |x| MPFR(x) }
  return [bcf, jsf, input, MPFR::Math.send(bcf.intern, *values).to_f]
end

5000.times do
  v = generate_test(bcf, jsf, *(n.times.map { prng.float }))
  
  unless v[3].nan?
    puts "assertULP(#{v[1]}, #{v[3].to_byte_representation.map { |x| '0x' + x.to_s(16).upcase.rjust(2, '0') }.join(', ')}, #{v[2].join(', ')}, #{v[3]})"
  end
end
