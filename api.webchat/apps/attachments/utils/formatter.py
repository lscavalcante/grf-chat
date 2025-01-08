class Formatter:

    @staticmethod
    def format_bytes(bytes_num):
        suffixex = ['B', 'KB', 'MB', 'GB']
        index = 0

        while bytes_num >= 1024 and index < len(suffixex) - 1:
            bytes_num /= 1024.0
            index += 1

        return '{:.3g} {}'.format(bytes_num, suffixex[index])
