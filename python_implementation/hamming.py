
import math

def power_of_two(n):
		return (n & (n - 1)) == 0

def hamming_encode(frame: str) -> str:
		
		m = len(frame)
		r = 0
		for i in range(m):
			if math.pow(2, i) >= m + i + 1:
				r = i
				break
		n = m + r

		matrix_ = [['p' if power_of_two(col) else 'd' for col in range(1, n+1)] 
							 for row in range(r+2)]
		
		
		iter_f = iter(frame)
		matrix_[0] = [next(iter_f, 'd') if x == 'd' else x for x in matrix_[0]]
	

		guide = matrix_[0]
		for col_indx, row in enumerate(matrix_[1:len(matrix_) - 1], start=1):
				for row_indx, _ in enumerate(row):
						# Se convierten los numeros de cada columna para poder asignar los bits 
						# correspondientes
						binary_num = bin(row_indx+1)[2:]
						if abs(col_indx) <= len(binary_num):
								if binary_num[-col_indx] == '1':
										selected_num = guide[row_indx]
										# Se asigna el numero correspondiente de la trama si no 
										# es una columna para asignar a un bit de paridad
										if selected_num != 'p':
												row[row_indx] = selected_num    

		# Se asignan los bits de paridad
		parity_bits = []
		p_cols = [i for i, x in enumerate(guide) if x == 'p']
		matrix_eval = matrix_[1:]
		for indx, col in enumerate(p_cols):
				row_ = matrix_eval[indx]
				matrix_eval[indx][col] = '1' if row_.count('1') % 2 != 0 else '0'
				parity_bits.append(matrix_eval[indx][col])

		# Se arma la trama
		t_matrix = list(zip(*matrix_eval)) 
		for i, col in enumerate(t_matrix):  
				if '1' in col:
						matrix_eval[-1][i] = '1'
				else:
						matrix_eval[-1][i] = '0'        

		return (''.join(matrix_eval[-1]), parity_bits)


# Calculando bits de paridad
def get_parity_bits(frame:str):
    frame_list = list(frame)
    parity_bits = [bit for i, bit in enumerate(frame_list, start=1) if power_of_two(i)]
    return ''.join(parity_bits)



def hamming_check(incoming_frame: str) -> str:
    
    frame_list = list(incoming_frame)
    parity_bits = [bit for i, bit in enumerate(frame_list, start=1) if power_of_two(i)]
    incoming_p_bits = ''.join(parity_bits)

    wo_parity = [bit for i, bit in enumerate(frame_list, start=1) if not power_of_two(i)]
    wo_parity = ''.join(wo_parity)

    encoded_frame = hamming_encode(wo_parity)
    original_p_bits = ''.join(encoded_frame[1])


    if incoming_p_bits == original_p_bits: return 'Todo ok'

    # comparando los bits de paridad
    compare_data = ['1' if x != y else '0' for x, y in zip(incoming_p_bits, original_p_bits)]
    compare_data.reverse()
    compare_data = ''.join(compare_data)
    compare_data = int(compare_data, 2)

    incoming_frame = list(incoming_frame)
    incoming_frame[compare_data - 1] = '\033[31m' + '1' + '\033[0m' if incoming_frame[compare_data - 1] == '1' else '\033[31m' + '0' + '\033[0m'
    return ''.join(incoming_frame)



def interface():
	c_bits = input("\nIngresa la cadena de bits: ")
	print()
	
	if c_bits == "":
		print("Cadena de bits vacia")
		return
	
	uu = hamming_encode(c_bits)
	
	print(f'TRAMA: {hamming_encode(c_bits)[0]}')
	print(f'BITS DE PARIDAD: {", ".join(hamming_encode(c_bits)[1])}\n')

	check_bits = input("Ingresa la cadena de bits a verificar: ")
	result = hamming_check(check_bits)
	print("\nIDENTIFICACION DE ERRORES: ")
	if result != 'Todo ok':
		print(f' >> Error en el bit {result}\n')
	else:
		print(f' >> {result}')	

if __name__ == '__main__':
	interface()
