

def power_of_two(n):
    return (n & (n - 1)) == 0

def encode(n: int, frame: str) -> str:
    m = len(frame)
    r = n - m
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


def compare(original_frame: str, compare_frame: str, n:int) -> str:
    f1, p_b1 = encode(n, original_frame)
    f2, p_b2 = encode(n, compare_frame)

    if p_b1 != p_b2:
        # comparando los bits de paridad
        compare_data = ['1' if x != y else '0' for x, y in zip(p_b1, p_b2)]
        compare_data.reverse()
        compare_data = ''.join(compare_data)
        compare_data = int(compare_data, 2)

        f2 = list(f2)
        f2[compare_data - 1] = '1͟' if f2[compare_data - 1] == '1' else '0͟'
        return ''.join(f2)
    else:
        return 'Todo ok'

    

# frame_result = encode(11, '0101000')
# print(frame_result)

print(compare('0101001', '0101000', 11), '\n')